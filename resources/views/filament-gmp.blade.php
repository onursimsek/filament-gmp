@php
    use Filament\Support\Facades\FilamentAsset;
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <script>
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
            key: @js($getApiKey()),
            v: "weekly",
        });
    </script>

    <div class="filament-gmp-component"
         wire:ignore
         x-ignore
         x-load
         x-load-css="[@js(FilamentAsset::getStyleHref('filament-gmp', 'onursimsek/filament-gmp'))]"
         x-load-src="{{ FilamentAsset::getAlpineComponentSrc('filament-gmp', 'onursimsek/filament-gmp') }}"
         x-data="filamentGmp({ state: $wire.$entangle('{{ $getStatePath() }}'), options: @js($getOptions()) })"
         x-init="$nextTick(() => { console.log('I\'m being initialized!') })">
        <div id="searchBox" x-show="options.searchable"></div>

        <div class="map-wrapper" :style="{height: options.height + 'px'}">
            <div id="map" :style="{height: options.height + 'px'}">
            </div>
        </div>

        <div class="location-field" x-show="options.geocode">
            <x-filament::input.wrapper prefix-icon="heroicon-m-map-pin" x-show="true">
                <input x-model="location.lat" type="text" class="fi-input" />
            </x-filament::input.wrapper>

            <x-filament::input.wrapper prefix-icon="heroicon-m-map-pin" x-show="true">
                <input x-model="location.lng" type="text" class="fi-input"/>
            </x-filament::input.wrapper>
        </div>
    </div>
</x-dynamic-component>
