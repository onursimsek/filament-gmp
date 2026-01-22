<?php

declare(strict_types=1);

namespace OnurSimsek\FilamentGmp;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\ServiceProvider;

class FilamentGmpServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'filament-gmp');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/filament-gmp'),
            ], 'filament-gmp-views');

            $this->publishes([
                __DIR__ . '/../config/filament-gmp.php' => config_path('filament-gmp.php'),
            ], 'filament-gmp-config');
        }

        FilamentAsset::register(
            assets: [
                Css::make('filament-gmp', __DIR__ . '/../resources/dist/filament-gmp.css')->loadedOnRequest(),
                AlpineComponent::make('filament-gmp', __DIR__ . '/../resources/dist/filament-gmp.js'),
            ],
            package: 'onursimsek/filament-gmp'
        );
    }

    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/filament-gmp.php',
            'filament-gmp'
        );
    }
}
