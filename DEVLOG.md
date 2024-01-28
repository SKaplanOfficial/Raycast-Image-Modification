# Image Modification DevLog - A more detailed changelog

## 2024-01-28

- Added "Strip EXIF Data" command
- Added ability to install ExifTool (for stripping EXIF data)
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
