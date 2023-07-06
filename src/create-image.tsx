/**
 * @file create-image.tsx
 *
 * @summary Raycast command to create images with various patterns and dimensions.
 * @author Stephen Kaplan <skaplanofficial@gmail.com>
 *
 * Created at     : 2023-07-06 14:53:50
 * Last modified  : 2023-07-06 15:47:56
 */

import os from "os";
import path from "path";

import { Action, ActionPanel, Color, Grid, Icon, showToast, Toast } from "@raycast/api";

import ImagePatternGrid from "./components/ImagePatternGrid";
import { generatePlaceholder, standardDimensions } from "./utilities/generators";
import { cleanup, getDestinationPaths, moveImageResultsToFinalDestination, showErrorToast } from "./utilities/utils";

export default function Command() {
  const squareOptions = standardDimensions.map((width) =>
    standardDimensions
      .filter((height) => width == height)
      .map((height) => {
        return (
          <Grid.Item
            title={`${width}x${height}`}
            key={`${width}x${height}`}
            content={{ source: `thumbnails/${width}x${height}.webp` }}
            actions={
              <ActionPanel>
                <Action.Push
                  title={`Select Size ${width}x${height}`}
                  icon={Icon.Center}
                  target={<ImagePatternGrid width={width} height={height} />}
                />
                <Action
                  title={`Create ${width}x${height} Placeholder`}
                  icon={Icon.Image}
                  shortcut={{ modifiers: ["cmd"], key: "p" }}
                  onAction={async () => {
                    const destinations = getDestinationPaths([path.join(os.tmpdir(), `${width}x${height}.png`)], true);
                    const toast = await showToast({ title: "Creating Placeholder...", style: Toast.Style.Animated });
                    try {
                      await generatePlaceholder(width, height, destinations[0]);
                      await moveImageResultsToFinalDestination(destinations);
                      toast.title = `Created Placeholder`;
                      toast.style = Toast.Style.Success;
                    } catch (error) {
                      await showErrorToast(`Failed To Create Placeholder`, error as Error, toast);
                    } finally {
                      cleanup();
                    }
                  }}
                />
              </ActionPanel>
            }
          />
        );
      })
  );

  const wideOptions = standardDimensions.map((width) =>
    standardDimensions
      .filter((height) => width / height > 4 / 3 && width / height < 15 / 3)
      .map((height) => {
        return (
          <Grid.Item
            title={`${width}x${height}`}
            key={`${width}x${height}`}
            content={{ source: `thumbnails/${width}x${height}.webp`, tintColor: Color.Red }}
          />
        );
      })
  );

  const tallOptions = standardDimensions.map((width) =>
    standardDimensions
      .filter((height) => height / width > 4 / 3 && height / width < 15 / 3)
      .map((height) => {
        return (
          <Grid.Item
            title={`${width}x${height}`}
            key={`${width}x${height}`}
            content={{ source: `thumbnails/${width}x${height}.webp`, tintColor: Color.Green }}
          />
        );
      })
  );

  const extremeOptions = standardDimensions.map((width) =>
    standardDimensions
      .filter((height) => height / width > 15 / 3 || width / height > 15 / 3)
      .map((height) => {
        return (
          <Grid.Item
            title={`${width}x${height}`}
            key={`${width}x${height}`}
            content={{ source: `thumbnails/${width}x${height}.webp`, tintColor: Color.Blue }}
          />
        );
      })
  );

  return (
    <Grid
      navigationTitle="Image Size Options"
      searchBarPlaceholder="Search image sizes..."
      inset={Grid.Inset.Small}
      isLoading={false}
    >
      <Grid.Section title="Square">{squareOptions}</Grid.Section>

      <Grid.Section title="Wide">{wideOptions}</Grid.Section>

      <Grid.Section title="Tall">{tallOptions}</Grid.Section>

      <Grid.Section title="Extreme">{extremeOptions}</Grid.Section>
    </Grid>
  );
}
