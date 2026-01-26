<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Google Maps API Key
    |--------------------------------------------------------------------------
    */
    'api_key' => env('GOOGLE_MAPS_API_KEY'),
    'map_id' => env('GOOGLE_MAPS_MAP_ID'),

    'defaults' => [
        'center' => [
            'lat' => (float) env('GOOGLE_MAPS_DEFAULT_LAT', 41.0384389),
            'lng' => (float) env('GOOGLE_MAPS_DEFAULT_LNG', 28.9870754),
        ],
        'zoom' => (int) env('GOOGLE_MAPS_DEFAULT_ZOOM', 12),
        'height' => (int) env('GOOGLE_MAPS_DEFAULT_HEIGHT', 400),
        'searchable' => (bool) env('GOOGLE_MAPS_DEFAULT_SEARCHABLE', true),
        'draggable' => (bool) env('GOOGLE_MAPS_DEFAULT_DRAGGABLE', true),
        'precision' => (int) env('GOOGLE_MAPS_DEFAULT_PRECISION', 7),
        'geocode' => (bool) env('GOOGLE_MAPS_DEFAULT_GEOCODE', false),
    ],

    /**
     * https://developers.google.com/maps/documentation/javascript/reference/place#Place-Properties
     */
    'place_fields' => ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsLinks'],

    /**
     * https://developers.google.com/maps/documentation/javascript/reference/places-widget#PlaceAutocompleteElement
     */
    'place_autocomplete' => [
        'include_primary_types' => ['cafe', 'coffee_shop', 'bakery', 'breakfast_restaurant'],
        'include_region_codes' => ['tr'],
        'requested_language' => 'tr',
    ],
];
