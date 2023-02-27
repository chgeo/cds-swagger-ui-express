# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 0.6.0 - 2023-02-27

### Added

- Way to pass swagger (UI) options. See [README.md](README.md).
- JSDoc type definitions for options.

### Changed

- The default site title is now _\<Service Name\> - Swagger UI_ (instead of just _Swagger UI_)
- REST services are now available as well in the Swagger UI.  Previously, only OData services were allowed.  This was to avoid potential issues as the underlying OpenAPI transformation uses OData as intermediate protocol.  So, as long as we don't see issues, allow REST services as well.

### Fixed

- Multiple services are now properly served, w/o the previous stale content of `swagger-ui-init.js`.  Requires `swagger-ui-express` >= 4.6.2

## Version 0.5.0 - 2022-06-09

### Added

- Option `apiPath` to configure a root URL path for the services, which is useful if behind a reverse proxy.

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
