# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.16.0]

### Added

- Option to start PHP built-in web server without router script.
- Extended logging with DBGp packets.
- Extended properties support. Always enable extended properties so fields are decoded in UTF-8.

### Changed

- Switched to Xdebug 3 default port 9003.
- Changed default exception breakpoint settings to all off.

### Fixed

- Internal Source Reference for virtual source files fixed - when stepping into eval()

## [1.15.1]

### Changed

- Defined under packages.json this extension should be preferred for PHP debugging.

## [1.15.0]

### Added

- Support for terminateDebuggee option letting the user choose to keep the debuggee running. Press Alt when hovering over stop action.
- Handle breakpoints in a async manner.

### Changed

- Do not display error dialog on failed eval
