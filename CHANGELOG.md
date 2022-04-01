# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 0.4.0 - 2022-04-01

### Changed

- The _Preview_ text on index page has been added to accomodate the change in `@sap/cds-dk` 4.9.0 that removes that text suffix.
- Require `@sap/cds-dk@^4.9.0`

## Version 0.3.0 - 2021-09-22

### Changed

- The `serving Swagger UI...` log lines are not longer sent to console by default to avoid clutter in the default output.  They can be enabled with `DEBUG=swagger` set as environment variable.

## Version 0.2.0 - 2021-07-12

### Changed

- Requires `@sap/cds-dk` 4.3.0, no more polyfill for older versions

### Fixed

- Options can be provided partially

## Version 0.1.1 - 2021-07-06

### Changed

- Readme, sample code


## Version 0.1.0 - 2021-07-02

### Added

Initial release
