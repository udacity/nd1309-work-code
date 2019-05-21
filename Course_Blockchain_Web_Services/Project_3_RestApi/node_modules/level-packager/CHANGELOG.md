# Changelog

## [Unreleased]

## [3.1.0] - 2018-05-28

### Changed
* Split up tests into `abstract/*-test.js` (@ralphtheninja)

### Removed
* Remove `.jshintrc` (@ralphtheninja)

## [3.0.0] - 2018-05-23

### Added
* Add node 10 to Travis (@ralphtheninja)
* Add `UPGRADING.md` (@ralphtheninja)

### Changed
* Update `standard` to `^11.0.0` (@ralphtheninja)
* Update `encoding-down` to `~5.0.0` (@ralphtheninja)
* Update `leveldown` to `^4.0.0` (@ralphtheninja)
* Update `levelup` to `^3.0.0` (@ralphtheninja)
* Change `License & Copyright` to `License` in README (@ralphtheninja)
* Replace `const` with `var` for IE10 support (@ralphtheninja)

### Removed
* Remove node 4 from Travis (@ralphtheninja)

## [2.1.1] - 2018-02-13

### Added
* Travis: add 9 (@ralphtheninja)

### Changed
* Update `encoding-down` to `~4.0.0` (@ralphtheninja)
* Update `leveldown` to `^3.0.0` (@ralphtheninja)
* Update copyright year to 2018 (@ralphtheninja)

### Fixed
* Test: clean up `level-test-*` dbs after tests are done (@ralphtheninja)

## [2.1.0] - 2017-12-13

### Added
* Add `standard` for linting (@ralphtheninja)

### Changed
* Attach `.errors` from `levelup` to `Level` constructor (@ralphtheninja)

## [2.0.2] - 2017-11-11

### Changed
* Update `encoding-down` to `~3.0.0` (@vweevers)
* README: update node badge (@vweevers)

### Fixed
* Travis: restore node 4 (@vweevers)

## [2.0.1] - 2017-10-12

### Added
* Test that encoding options default to utf8 (@ralphtheninja)
* Test that `.keyEncoding` and `.valueEncoding` are passed to `encoding-down` (@ralphtheninja)

### Fixed
* Fix encoding options to `encoding-down` (@ralphtheninja)

## [2.0.0] - 2017-10-11

### Added
* README: add `level` badge (@ralphtheninja)

### Changed
* Update `levelup` to `^2.0.0` (@ralphtheninja)
* Update `encoding-down` to `~2.3.0` (@ralphtheninja)
* Update `leveldown` to `^2.0.0` (@ralphtheninja)
* README: update npm badges to similar badge style (@ralphtheninja)

### Removed
* README: Remove Greenkeeper badge (@ralphtheninja)

## [2.0.0-rc3] - 2017-09-16

### Changed
* Update `levelup` to `2.0.0-rc3` (@ralphtheninja)
* Update `leveldown` to `^1.8.0` (@ralphtheninja)

## [2.0.0-rc2] - 2017-09-12

### Changed
* Update `levelup` to `2.0.0-rc2` (@ralphtheninja)
* Update `encoding-down` to `~2.2.0` (@ralphtheninja)

## [2.0.0-rc1] - 2017-09-04

### Added
* Travis: add 8 (@ralphtheninja)
* README: add Greenkeeper badge (@ralphtheninja)
* README: add node badge (@ralphtheninja)

### Changed
* README: steer away from `LevelDOWN` to `abstract-leveldown` (@ralphtheninja)
* Update copyright year to 2017 (@ralphtheninja)

### Removed
* Travis: remove 0.12, 4, 5 and 7 (@ralphtheninja)

### Fixed

## [1.2.1] - 2016-12-27

### Added
* Travis: add 6 and 7 (@ralphtheninja)

### Changed
* Travis: use gcc 4.8 (@ralphtheninja)

### Removed
* Travis: remove 0.10, 1.0, 1.8, 2 and 3 (@ralphtheninja)

## [1.2.0] - 2015-11-27

### Added
* Add dependency badge (@ralphtheninja)
* Travis: add 1.0, 2, 3, 4 and 5 (@ralphtheninja)

### Changed
* Update `levelup` to `~1.3.0` (@ralphtheninja)
* Update `leveldown` to `^1.4.2` (@ralphtheninja)

## [1.1.0] - 2015-06-09

### Changed
* Update `levelup` to `~1.2.0` (@mcollina)
* Update `leveldown` to `~1.2.2` (@mcollina)

## [1.0.0] - 2015-05-19

### Changed
* README: add link to `level/community` repo (@ralphtheninja)

## [1.0.0-0] - 2015-05-16

### Added
* Add Travis (@ralphtheninja)
* Add `leveldown` dev dependency (@ralphtheninja)

### Changed
* Update `levelup` to `~1.0.0` (@ralphtheninja)
* Run tests using `packager(leveldown)` (@ralphtheninja)

### Removed
* Remove `level` dependency (@ralphtheninja)

## [0.19.7] - 2015-05-10

### Added
* Add `level-test-*` to `.gitignore` (@juliangruber)

### Changed
* Run the tests if they are not required (@juliangruber)
* Rename the repository to `packager` (@juliangruber)

## [0.19.6] - 2015-05-10

### Fixed
* Fix incorrect options logic (@juliangruber)

## [0.19.5] - 2015-05-10

### Fixed
* Fixed bug with missing opening curly brace (@juliangruber)

## [0.19.4] - 2015-05-10

### Changed
* Use `typeof` instead of `util.isFunction()` (@juliangruber)

## [0.19.3] - 2015-05-10

### Fixed
* Fix missing closing parenthesis (@juliangruber)

## [0.19.2] - 2015-05-10

### Fixed
* Fix missing closing parenthesis (@ralphtheninja)

## [0.19.1] - 2015-05-10

### Fixed
* `null` options should not be treated as object (@deian)

## [0.19.0] - 2015-05-04

### Changed
* Plain MIT license (@andrewrk)
* README: update logo and copyright year (@ralphtheninja)
* Update `levelup` to `~0.19.0` (@ralphtheninja)

## [0.18.0] - 2013-11-18

### Changed
* Bumped version (@rvagg)

## [0.17.0-5] - 2013-10-12

### Changed
* Clean up debugging noise (@rvagg)

## [0.17.0-4] - 2013-10-12

### Removed
* Remove `copy()` (@rvagg)

### Fixed
* Fix `repair()` and `destroy()` (@rvagg)

## [0.17.0-3] - 2013-10-12

### Fixed
* Made tests compatible with node 0.8 (@rvagg)

## [0.17.0-2] - 2013-10-12

### Added
* Add options to exported tests to handle memdown (@rvagg)

### Changed
* README: `level` -> `level-packager` (@rvagg)

## [0.17.0-1] - 2013-10-09

### Removed
* Remove `tape` from devDependencies, allow callers to pass in custom test function (@rvagg)

## 0.17.0 - 2013-10-09

:seedling: Initial release.

[Unreleased]: https://github.com/level/packager/compare/v3.1.0...HEAD
[3.1.0]: https://github.com/level/packager/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/level/packager/compare/v2.1.1...v3.0.0
[2.1.1]: https://github.com/level/packager/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/level/packager/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/level/packager/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/level/packager/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/level/packager/compare/v2.0.0-rc3...v2.0.0
[2.0.0-rc3]: https://github.com/level/packager/compare/v2.0.0-rc2...v2.0.0-rc3
[2.0.0-rc2]: https://github.com/level/packager/compare/v2.0.0-rc1...v2.0.0-rc2
[2.0.0-rc1]: https://github.com/level/packager/compare/v1.2.1...v2.0.0-rc1
[1.2.1]: https://github.com/level/packager/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/level/packager/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/level/packager/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/level/packager/compare/v1.0.0-0...v1.0.0
[1.0.0-0]: https://github.com/level/packager/compare/v0.19.7...v1.0.0-0
[0.19.7]: https://github.com/level/packager/compare/v0.19.6...v0.19.7
[0.19.6]: https://github.com/level/packager/compare/v0.19.5...v0.19.6
[0.19.5]: https://github.com/level/packager/compare/v0.19.4...v0.19.5
[0.19.4]: https://github.com/level/packager/compare/v0.19.3...v0.19.4
[0.19.3]: https://github.com/level/packager/compare/v0.19.2...v0.19.3
[0.19.2]: https://github.com/level/packager/compare/v0.19.1...v0.19.2
[0.19.1]: https://github.com/level/packager/compare/v0.19.0...v0.19.1
[0.19.0]: https://github.com/level/packager/compare/0.18.0...v0.19.0
[0.18.0]: https://github.com/level/packager/compare/0.17.0-5...0.18.0
[0.17.0-5]: https://github.com/level/packager/compare/0.17.0-4...0.17.0-5
[0.17.0-4]: https://github.com/level/packager/compare/0.17.0-3...0.17.0-4
[0.17.0-3]: https://github.com/level/packager/compare/0.17.0-2...0.17.0-3
[0.17.0-2]: https://github.com/level/packager/compare/0.17.0-1...0.17.0-2
[0.17.0-1]: https://github.com/level/packager/compare/0.17.0...0.17.0-1
