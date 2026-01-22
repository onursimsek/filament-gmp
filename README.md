# Google Maps package for Filament PHP

[![Latest Version on Packagist](https://img.shields.io/packagist/v/onursimsek/filament-gmp.svg?style=flat-square)](https://packagist.org/packages/onursimsek/filament-gmp)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/onursimsek/filament-gmp/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/onursimsek/filament-gmp/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/onursimsek/filament-gmp/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/onursimsek/filament-gmp/actions?query=workflow%3A"Fix+PHP+code+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/onursimsek/filament-gmp.svg?style=flat-square)](https://packagist.org/packages/onursimsek/filament-gmp)



This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Installation

You can install the package via composer:

```bash
composer require onursimsek/filament-gmp
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="filament-gmp-config"
```

This is the contents of the published config file:

```php
return [
    'api_key' => env('GOOGLE_MAPS_API_KEY'),
    'map_id' => env('GOOGLE_MAPS_MAP_ID'),
];
```

## Usage

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Onur Simsek](https://github.com/onursimsek)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
