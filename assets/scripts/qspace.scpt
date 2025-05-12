supportedTypes = {
  png: true,
  jpg: true,
  jpeg: true,
  tif: true,
  tiff: true,
  heif: true,
  heifs: true,
  heic: true,
  heics: true,
  acvi: true,
  acvs: true,
  hif: true,
  gif: true,
  ico: true,
  icns: true,
  astc: true,
  bmp: true,
  dds: true,
  exr: true,
  jp2: true,
  j2c: true,
  jpf: true,
  j2k: true,
  jpx: true,
  ktx: true,
  pbm: true,
  pgm: true,
  ppm: true,
  pnm: true,
  pfm: true,
  psd: true,
  pvr: true,
  tga: true,
  webp: true,
  svg: true,
  pdf: true,
  avif: true,
};

function imagePathsForItemsInSelection(selection) {
  const qspace = Application("QSpace Pro");
  const imagePaths = selection.flatMap((urlString) => {
    const filePath = urlString.replace(/.*:(\/\/)?(\/.*\..*$)/g, "$2");
    const fileExtension = filePath.replace(/.*\.(.+)$/g, "$1").toLowerCase();
    if (supportedTypes[fileExtension]) {
      return [filePath];
    }
    return [];
  });
  return imagePaths;
}

function run() {
  try {
    const qspace = Application("QSpace Pro");
    let imagePaths = [];

    let selection = qspace.selectedItems.urlstr();
    if (selection.length > 0) {
      imagePaths = imagePathsForItemsInSelection(selection);
    }

    const windowIds = qspace.windows.id();
    if (imagePaths.length == 0 && windowIds.length > 0) {
      for (const windowId of windowIds) {
        const window = qspace.windows.byId(windowId);
        const selection = window.activatedPane.selectedItems.urlstr();
        if (selection.length > 0) {
          imagePaths = imagePathsForItemsInSelection(selection);
          if (imagePaths.length > 0) {
            break;
          }
        }
      }
    }
    return imagePaths;
  } catch (error) {
    if (error.errorNumber === -1743) {
      const currentApplication = Application.currentApplication();
      currentApplication.includeStandardAdditions = true;
      const alert = currentApplication.displayAlert("Permission Needed", {
        message:
          "To use Image Modification on selected images in QSpace Pro, you must allow Raycast to control QSpace Pro in System Settings > Privacy & Security > Automation.",
        buttons: ["Dismiss", "Open Privacy Settings"],
      });
      const btn = alert.buttonReturned;
      if (btn == "Open Privacy Settings") {
        currentApplication.openLocation("x-apple.systempreferences:com.apple.preference.security?Privacy_Automation");
      }
    } else {
      console.log(
        "Error:",
        error.message,
        "errorNumber:",
        error.errorNumber,
        "line:",
        error.line,
        "column:",
        error.column,
      );
    }
  }
}
