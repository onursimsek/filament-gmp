<?php

declare(strict_types=1);

namespace OnurSimsek\FilamentGmp;

use Filament\Forms\Components\Field;

class FilamentGmp extends Field
{
    protected string $view = 'filament-gmp::filament-gmp';

    protected array $center = [];

    protected float $lat;

    protected float $lng;

    protected int $zoom;

    private \Closure|int $height;

    private \Closure|bool $draggable = true;

    private \Closure|bool $searchable = true;

    private array $config;

    public function center(float $lat, float $lng): static
    {
        $this->center = ['lat' => $lat, 'lng' => $lng];

        return $this;
    }

    public function getCenter(): array
    {
        return $this->evaluate($this->center);
    }

    private function lat(float $lat): static
    {
        $this->lat = $lat;

        return $this;
    }

    private function lng(float $lng): static
    {
        $this->lng = $lng;

        return $this;
    }

    public function zoom(int $zoom): static
    {
        $this->zoom = $zoom;

        return $this;
    }

    public function getZoom(): int
    {
        return $this->evaluate($this->zoom);
    }

    public function height(\Closure|int $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getHeight(): int
    {
        return $this->evaluate($this->height);
    }

    public function draggable(\Closure|bool $draggable): static
    {
        $this->draggable = $draggable;

        return $this;
    }

    public function getDraggable(): bool
    {
        return $this->evaluate($this->draggable);
    }

    public function searchable(\Closure|bool $searchable): static
    {
        $this->searchable = $searchable;

        return $this;
    }

    public function getSearchable(): bool
    {
        return $this->evaluate($this->searchable);
    }

    public function getApiKey(): string
    {
        return $this->config()['api_key'];
    }

    public function getMapId(): string
    {
        return $this->config()['map_id'];
    }

    public function getOptions(): array
    {
        return [
            'map_id' => $this->getMapId(),
            'center' => $this->getCenter(),
            'zoom' => $this->getZoom(),
            'height' => $this->getHeight(),
            'searchable' => $this->getSearchable(),
            'draggable' => $this->getDraggable(),
            'precision' => $this->getDefaultsFromConfig()['precision'],
            'geocode' => $this->getDefaultsFromConfig()['geocode'],
            'place_fields' => $this->config()['place_fields'],
            'place_autocomplete' => $this->config()['place_autocomplete'],
        ];
    }

    private function getDefaultsFromConfig(): array
    {
        return $this->config()['defaults'];
    }

    private function setDefaultsFromConfig(): void
    {
        $defaults = $this->getDefaultsFromConfig();

        $this->height($defaults['height'])
            ->zoom($defaults['zoom'])
            ->searchable($defaults['searchable'])
            ->draggable($defaults['draggable'])
            ->center(...$defaults['center']);
    }

    private function config(): array
    {
        return $this->config ??= config('filament-gmp');
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->setDefaultsFromConfig();

         // $this->afterStateHydrated(static function (FilamentGmp $component, $record) {});

        // $this->dehydrateStateUsing(static fn ($state) => $state);
    }
}
