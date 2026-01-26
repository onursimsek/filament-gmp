interface PlaceData {
    id: string,
    displayName: string | null,
    formattedAddress: string | null,
    location: {
        lat: number,
        lng: number,
    },
    placeURI: string,
}

interface GmpOption {
    // apiKey: string,
    map_id: string,
    center: {
        lat: number,
        lng: number,
    },
    zoom: number,
    height: number,
    searchable: boolean,
    draggable: boolean,
    precision: number,
    geocode: boolean,
    place_fields: string[],
    place_autocomplete: {
        include_primary_types: string[],
        include_region_codes: string[],
        requested_language: string,
    }
}

interface GmpDefault {
    lat: number | null,
    lng: number | null,
}

const [{ Map }, { AdvancedMarkerElement }, { Geocoder }, { PlaceAutocompleteElement }] = await Promise.all([
    google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
    google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
    google.maps.importLibrary('geocoding') as Promise<google.maps.GeocodingLibrary>,
    google.maps.importLibrary('places') as Promise<google.maps.PlacesLibrary>,
])

let map = Map;
const mapElement = document.getElementById("map") as HTMLElement;
const searchBoxElement = document.getElementById("searchBox") as HTMLInputElement;

// const geocoder = new Geocoder();
const placeAutocomplete = new PlaceAutocompleteElement({});

export default function filamentGmp({state, options}: { state: PlaceData, options: GmpOption }) {
    return {
        state,
        options,
        placeData: null as PlaceData | null,
        marker: null as google.maps.marker.AdvancedMarkerElement | null,
        location: {
            lat: null as number | null,
            lng: null as number | null,
        },

        init(): void {
            console.log(this.state);

            map = new Map(mapElement, {
                center: this.options.center,
                zoom: this.options.zoom,
                mapId: this.options.map_id,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,

            });

            if (this.state?.location) {
                this.setPosition(this.state.location);
                this.focusPosition(this.state.location);
            }

            /*map.addListener("click", ({latLng}: {
                latLang: google.maps.LatLng
            }): void => this.setPosition(latLng.toJSON()));*/

            if (this.options.searchable) {
                placeAutocomplete.includedPrimaryTypes = this.options.place_autocomplete.include_primary_types;
                placeAutocomplete.includedRegionCodes = this.options.place_autocomplete.include_region_codes;
                placeAutocomplete.requestedLanguage = this.options.place_autocomplete.requested_language;
                this.addSearchBox()
            }
        },

        addSearchBox() {
            searchBoxElement.appendChild(placeAutocomplete);

            placeAutocomplete.addEventListener("gmp-select", ({ placePrediction }: {
                placePrediction: google.maps.places.PlacePrediction
            }): Promise<void> => this.selectAutocompletePlace({ placePrediction }));
        },

        async selectAutocompletePlace({ placePrediction }: {
            placePrediction: google.maps.places.PlacePrediction
        }): Promise<void> {
            await placePrediction
                .toPlace()
                .fetchFields({ fields: this.options.place_fields })
                .then(({ place }: { place: Place }): void => {
                    if (!place.location?.toJSON()) {
                        alert('Konum belirlenemedi!');
                        return;
                    }

                    this.state = {
                        id: place.id,
                        displayName: place.displayName || null,
                        formattedAddress: place.formattedAddress || null,
                        location: place.location?.toJSON(),
                        placeURI: place.googleMapsLinks.placeURI,
                    };

                    let position = place.location?.toJSON();

                    this.setPosition(position);

                    this.focusPosition(position);
                });
        },

        /*async reverseGeocode({ lat, lng }: { lat: number, lng: number }): Promise<void> {
            geocoder.geocode({ location: { lat, lng } })
                .then((response) => {
                    console.log(response)
                    this.placeData = {
                        id: '',
                        displayName: null,
                        formattedAddress: null,
                        location: {
                            lat: this.precision(lat),
                            lng: this.precision(lng),
                        },
                        placeURI: '',
                    };
                })
        },*/

        setPosition({ lat, lng }: { lat: number, lng: number }): void {
            if (!(this.marker instanceof AdvancedMarkerElement)) {
                this.marker = new AdvancedMarkerElement({ map });
            }

            this.marker.position = { lat: lat, lng: lng };

            // this.reverseGeocode({ lat, lng });

            this.location = {
                lat: this.precision(lat),
                lng: this.precision(lng),
            };
        },

        precision(location: number): number {
            return parseFloat(location.toFixed(this.options.precision))
        },

        focusPosition({ lat, lng }: { lat: number, lng: number }): void {
            map.panTo({ lat, lng });
            map.setZoom(19);
        }
    };
};
