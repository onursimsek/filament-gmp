<?php

declare(strict_types=1);

namespace OnurSimsek\FilamentGmp;

use Filament\Forms\Components\Field;

class FilamentGmp extends Field
{
    protected string $view = 'filament-gmp::filament-gmp';

    private array $options = [
        //'zoom' => 12,
        'lat' => 37.9106,
        'lng' => 40.2365,
    ];

    protected \Closure|float|null $lat = null;

    protected \Closure|float|null $lng = null;

    protected \Closure|int $zoom = 14;

    private \Closure|int $height = 300;

    private \Closure|bool $draggable = true;

    private \Closure|bool $searchable = true;

    public function lat(\Closure|float $lat): static
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLat(): float|string|null
    {
        return $this->evaluate($this->lat);
    }

    public function lng(\Closure|float $lng): static
    {
        $this->lng = $lng;

        return $this;
    }

    public function getLng(): float|string|null
    {
        return $this->evaluate($this->lng);
    }

    public function zoom(\Closure|int $zoom): static
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

    public function getApiKey(): ?string
    {
        return config('filament-gmp.api_key');
    }

    public function getOptions(): array
    {
        return [
                'apiKey' => $this->getApiKey(),
                'lat' => $this->getLat(),
                'lng' => $this->getLng(),
                'zoom' => $this->getZoom(),
                'height' => $this->getHeight(),
            ] + $this->options;
    }
}
