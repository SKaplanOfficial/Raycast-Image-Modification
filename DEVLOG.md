# Image Modification DevLog - A more detailed changelog

## Release 1.10.2 - 2025-xx-xx

### 2025-03-06

- Rewrote various scripts to improve performance, using whichever language was fastest for the task. Improvements inspeed across the board:
  - Finder selection detection using compiled AppleScript -> ~20-40% faster on average
  - HoudahSpot selection detection using compiled AppleScript -> ~10-50% faster
  - Path Finder selection detection using JXA -> ~15% faster for multi-file operations
  - NeoFinder selection detection -> ~5-8% faster for muli-file operations
  - Improvements become exponentially more pronounced with larger file selections

### 2025-02-26

- Added support for QSpace Pro

## Release 1.10.1 - 2025-02-24

### 2025-02-24

- Added changes from store version 1.10.0 (AI tools)
- Added unique icon for remove background operation
- Added support for tilde expansion in file paths
- Updated metadata images to showcase AI tools and background removal
- Updated ExifTool to version 13.21
- Updated dependencies
- Fixed ExifTool failing to install or not recognizing current install (Resolve #16884)
- Fixed crash when trying to generate live preview for filters on PDFs (Resolve #16971)

### 2025-02-01

- Added 'Default Replacement Color' setting for the Remove Background command
- Added 'Crop By Default' setting for the Remove Background command
- Added 'Preserve Image Format' setting for the Remove Background command
- Added support for WebP, AVIF, SVG, and PDF images to the Remove Background command
- Set the 'Strip EXIF Data' command to be disabled by default

### 2025-01-29

- Added 'Remove Background' command to remove the background from selected images
  - Users can specify a color to replace the background with
  - Users can specify whether to crop the image to the foreground subject

## Release 1.10.0 - 2025-02-21

### 2025-02-14

- Use `imagePaths` instead of `resultPaths` so that AI can supply other paths if needed (e.g. from tools of other extensions)
- Remove success/failure toasts for AI tools

### 2025-02-04

- Add unique icon for each operation
- Fixed evals that still used `@imagemod` instead of `@sips`
- Fixed object undefined error when applying filters via the AI tool

### 2025-01-30

- Merged changes from store version 1.9.0 (new filters)
- Adjust AI instructions for some tools to improve consistency
- Undo extension rename (would cause too many issues on Raycast's end)

### 2025-01-23

- Added AI tool support for all image operations
- Rename extension from `sips` to `imagemod`

## Release 1.9.0 - 2025-01-30

### 2025-01-28

- Added setting to disable live filter previews
- Added setting to hide specific filters/filter categories from the filter list

### 2025-01-27

- Added 28 new filters:
  - Bump
  - Circle Splash
  - Droste
  - Eightfold Reflected Tile
  - Fourfold Reflected Tile
  - Fourfold Rotated Tile
  - Fourfold Translated Tile
  - Gabor Gradients
  - Glass Lozenge
  - Glide Reflected Tile
  - Height Field From Mask
  - Hole
  - Light Tunnel
  - Linear Bump
  - Op Tile
  - Parallelogram Tile
  - Perspective Tile
  - Pinch
  - Sixfold Reflected Tile
  - Sixfold Rotated Tile
  - Spotlight
  - Torus Lens
  - Triangle Kaleidoscope
  - Triangle Tile
  - Twelvefold Reflected Tile
  - Twirl
  - Unsharp Mask
  - Vortex
- Tagged each filter with its category
- Improved error handling, ensuring that full error messages can be copied to the clipboard
- Improve handling of file selection in non-standard folders such as Recents and smart folders (Resolve #16132)
- Fixed incorrect filter used when applying Median filter

### 2025-01-24

- Improved memory management when previewing filters. Heap usage is now significantly lower (Resolve #13995)
  - Filter previews are now scaled down to have a maximum width of 300px. This is fine for most filters, but some filters (e.g. `Kaleidoscope`) do not accurately represent the final result.

## Release 1.8.2 - 2024-09-11

### 2024-09-04

- Fixed error when installing the `avifenc` and `avifdec` binaries

## Release 1.8.1 - 2024-07-10

### 2024-07-08

- Added a "Lossless Conversions" setting for WebP and AVIF image operations, disabled by default
- Improved PNG optimization by using PNGOUT
  - This is (potentially) a temporary fix until (potentially) moving to ImageMagick
- Fixed a bug where intermediate files were not being deleted after various operations

## Release 1.8.0 - 2024-06-27

### 2024-06-26

- Added "JPEG Extension" setting to control whether .jpeg or .jpg is used as the extension for images converted to JPEG
- Fixed various instabilities when converting to/from various formats
- Fixed "command not found" bug when optimizing WebP images

### 2024-06-25

- Added ability to create QuickLinks to specific conversion operations
- Added ability to create QuickLinks to specific create-image operations
- Added "Generate Image Previews" toggle to control whether image previews are generated for the "Create New Image" command
- Fixed "Strip EXIF Data" failing when using the "Replace Original" result handling option

### 2024-06-24

- Added support for NeoFinder, HoudahSpot
- Added support for AVIF images
- Added support for several new conversions: PDF->SVG, PDF->WebP, SVG->PDF, SVG->WebP
- Added an alert for when automation permissions have not been granted
- Operations will now look at alternative file managers first if they are the active app, regardless of the preference setting

### 2024-06-23

- Fixed PDF->JPEG conversion not actually using JPEG as the output format
- Fixed images not getting saved to the correct location when using the clipboard as the image source

## Release 1.7.0 - 2024-01-29

### 2024-01-28

- Added live filter preview of first selected image file
- Added "Strip EXIF Data" command
- Added ability to install ExifTool (for stripping EXIF data)
- Added checksum verification for ExifTool download
- Fixed bug which caused an error when padding a webp image but still padded the image correctly

### 2024-01-27

- Added logic for handling arm vs. x86 architectures for libwebp operations
- Updated libwebp binaries
- Improved selection detection when Finder/Path Finder is not the frontmost application
- Fixed bug where converting from WebP to anything but PNG would change the file extension but not the file format

## Version 1.6.0 - Not Released (Live Previews carried into 1.7.0)

## Release 1.5.0 - 2023-07-31

### 2023-07-06

- Added 'Rotation Unit' setting for the Rotate Images command, supporting degrees and radians
- Added mathjs to support complex expressions in the Rotate Images command
- Added 'Default Pad Color' setting for the Pad Images command

### 2023-07-05

- Added support for running all commands on the contents of the clipboard
- Added 'Create New Image' command to create a new image with selectable dimensions and patterns
- Filters can now be applied to every page of a PDF

### 2023-06-18

- Added settings to show/hide image formats from the list of conversion formats
  - Each format can be shown/hidden individually
  - Added an action to open the Convert Images command preferences when all formats are hidden, alongside a brief message
- Added setting for where to store image results, supporting the following options:
  - Replace Original
  - Save In Containing Folder
  - Copy To Clipboard
  - Open In Preview
  - Save to Downloads
  - Save to Desktop
- Image operations will now ensure the destination file path is unique, to avoid overwriting existing files, unless the "Replace Original" result handling option is selected

## Version 1.4.0 - 2023-04-06

### 2023-04-03

- Added static image previews for filters (thanks [@Arron Hunt](https://github.com/arronhunt)!)

## Version 1.3.0 - 2023-03-31

### 2023-03-29

- Added support for WebP images to all operations using the [cwebp and dwebp binaries](https://developers.google.com/speed/webp/docs/precompiled)
- Added support for Path Finder

## Version 1.2.0 - 2023-03-24

### 2023-03-22

- Added 'Apply Image Filter' command to apply Core Image filters to images

## Version 1.1.0 - 2023-03-16

### 2023-03-15

- Added 'Pad Images' command to add a colored border to images
- Fixed bug where .heic images were not detected as images

## Version 1.0 - 2023-03-07
