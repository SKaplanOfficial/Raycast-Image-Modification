import { execSync } from "child_process";
import * as https from "https";
import * as tar from "tar";
import * as fs from "fs";

import { confirmAlert, environment, LocalStorage, open, showToast, Toast } from "@raycast/api";

import runOperation from "./operations/runOperation";
import stripEXIF from "./operations/stripEXIFOperation";
import { ExifToolLocation } from "./utilities/enums";
import { getSelectedImages } from "./utilities/utils";

/**
 * Prompts the user to install ExifTool. If the user accepts, ExifTool is installed to the support directory.
 */
async function installExifTool() {
  if (
    await confirmAlert({
      title: "Install ExifTool",
      message:
        "ExifTool is required to strip EXIF data. Would you like to install it now?\n\nThis will use 26.2 MB of disk space.",
      primaryAction: {
        title: "Install",
      },
    })
  ) {
    const supportPath = environment.supportPath;
    const tarURL = "https://exiftool.org/Image-ExifTool-12.74.tar.gz";
    open(supportPath);

    let waiting = true;
    https.get(tarURL, async (response) => {
      response.pipe(tar.x({ cwd: supportPath }));
      await LocalStorage.setItem("exifToolLocation", ExifToolLocation.SUPPORT_DIR);
      waiting = false;
    });

    while (waiting) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

/**
 * Determines whether ExifTool is on the path. If not, prompts the user to install it.
 */
async function setExifToolLocation() {
  // See if ExifTool is on the path
  try {
    execSync("exiftool -ver");
    await LocalStorage.setItem("exifToolLocation", ExifToolLocation.ON_PATH);
  } catch (error) {
    // If not, prompt the user to install it
    await installExifTool();
  }
}

/**
 * Gets the location of ExifTool, either on the path or in the support directory.
 * @returns The location of ExifTool, either on the path or in the support directory.
 */
async function getExifToolLocation() {
  const initialLocation = await LocalStorage.getItem("exifToolLocation");
  if (
    (initialLocation !== ExifToolLocation.ON_PATH && initialLocation !== ExifToolLocation.SUPPORT_DIR) ||
    !fs.existsSync(`${environment.supportPath}/Image-ExifTool-12.74/exiftool`)
  ) {
    await setExifToolLocation();
  }
  return await LocalStorage.getItem("exifToolLocation");
}

export default async function Command() {
  const selectedImages = await getSelectedImages();
  const exifToolLocation = await getExifToolLocation();
  if (!exifToolLocation) {
    await showToast({
      title: "Command Cancelled",
      message: "ExifTool is required to strip EXIF data.",
      style: Toast.Style.Failure,
    });
    return;
  }

  await runOperation({
    operation: () => stripEXIF(selectedImages, exifToolLocation as ExifToolLocation),
    selectedImages,
    inProgressMessage: "Sanitizing...",
    successMessage: "Sanitized",
    failureMessage: "Failed to sanitize",
  });
}
