@php
    use Filament\Support\Facades\FilamentAsset;
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div class="filament-gmp-component"
         wire:ignore
         x-ignore
         x-load
         x-load-css="[@js(FilamentAsset::getStyleHref('filament-gmp', 'onursimsek/filament-gmp'))]"
         x-load-src="{{ FilamentAsset::getAlpineComponentSrc('filament-gmp', 'onursimsek/filament-gmp') }}"
         x-data="filamentGmp({
            state: $wire.$entangle('{{ $getStatePath() }}'),
            data: {
                options: @js($getOptions()),
                searchable: @js($getSearchable()),
                draggable: @js($getDraggable()),
            },
        })"
    >
        <x-filament::input.wrapper prefix-icon="heroicon-m-magnifying-glass" x-show="data.searchable">
            <input type="text" class="fi-input"/>
        </x-filament::input.wrapper>

        <div class="map-wrapper" :style="{height: data.options.height + 'px'}">
            <div id="map" x-ref="map" :style="{height: data.options.height + 'px'}">
            </div>
        </div>

        <div class="location-field">
            <x-filament::input.wrapper prefix-icon="heroicon-m-map-pin" x-show="true">
                <input x-model="lat" type="text" class="fi-input" />
            </x-filament::input.wrapper>

            <x-filament::input.wrapper prefix-icon="heroicon-m-map-pin" x-show="true">
                <input x-model="lng" type="text" class="fi-input"/>
            </x-filament::input.wrapper>
        </div>
    </div>
</x-dynamic-component>
