# Image Modification DevLog - A more detailed changelog

## 2024-06-24

- Added support for NeoFinder, HoudahSpot
- Added support for AVIF images
- Added support for several new conversions: PDF->SVG, PDF->WebP, SVG->PDF, SVG->WebP
- Added an alert for when automation permissions have not been granted
- Operations will now look at alternative file managers first if they are the active app, regardless of the preference setting

## 2024-06-23

- Fixed PDF->JPEG conversion not actually using JPEG as the output format
- Fixed images not getting saved to the correct location when using the clipboard as the image source

## 2024-01-28

- Added "Strip EXIF Data" command
- Added ability to install ExifTool (for stripping EXIF data)
- Added checksum verification for ExifTool download
- Fixed bug which caused an error when padding a webp image but still padded the image correctly

## 2024-01-27

- Added logic for handling arm vs. x86 architectures for libwebp operations
- Updated libwebp binaries
- Improved selection detection when Finder/Path Finder is not the frontmost application
- Fixed bug where converting from WebP to anything but PNG would change the file extension but not the file format

## 2023-07-06

- Added 'Rotation Unit' setting for the Rotate Images command, supporting degrees and radians
- Added mathjs to support complex expressions in the Rotate Images command
- Added 'Default Pad Color' setting for the Pad Images command

## 2023-07-05

- Added support for running all commands on the contents of the clipboard
- Added 'Create New Image' command to create a new image with selectable dimensions and patterns
- Filters can now be applied to every page of a PDF

## 2023-06-18

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
