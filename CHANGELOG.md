# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 0.11.0 - tbd

### Changed

- Options from `package.json` now get used as defaults even if the middleware is added programmatically.  You can now call it w/o options but have them in `package.json` only, or mix them, with the programmatic options taking precedence.
- Default texts have changed and are now more configurable through
  - `@title` for service title
  - `@Core.Description` for service short text
  - `@Core.LongDescription` for service description
- This plugin is no longer tested with Node 18, which has reached end of life.

### Fixed

- Compatibility with express 5, as `@sap/cds` >= 9.7.0 supports it now.

## Version 0.10.0 - 2024-10-02

### Added

- The OpenAPI spec is no available for download on `.../openapi.json` and linked in the UI.

### Changed

- The default value for option `apiPath` is now `/`, allowing more flexible control over the root path where the CDS services are served.  Formerly, it was not possible to set root path _relative_  to the current host, like `abc.com/1234-appid/$api-docs/...`, `abc.com/5678-appid/$api-docs/...`.

## Version 0.9.0 - 2024-07-15

### Changed

- Use `@cap-js/openapi` instead of `@sap/cds-dk`, leading to lighter dependencies

## Version 0.8.0 - 2024-01-18

### Added

- Auto-registration mode: the middleware registers itself when loaded as a CAP plugin
- Declarative configuration through `package.json` / `cds-rc.json`
- Programmatic registration is still possible, but disables auto mode then

### Changed

- Make dependency to `@sap/cds-dk` optional.  If running with the `cds` executable during development, the dependency is fulfilled anyways. Only when running as part of a deployed app with `cds-serve`, then such a dependency is needed.

## Version 0.7.0 - 2023-12-04

### Changed

- Requires `@sap/cds` ^7
- Requires `@sap/cds-dk` ^7
- Requires `swagger-ui-express` / `swagger-ui` ^5
- Drops Node 14 and 16 support. Minimum Node version is now 18.

### Added

- New option `odataVersion` to specify the OData version used to compile the OpenAPI specs

### Fixed

- Works with `@sap/cds` 7.4 again

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
