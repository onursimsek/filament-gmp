export default function filamentGmp({state, data = {}}: { state: any, data: object }) {
    return {
        state,
        data,
        map: null as google.maps.Map | null,
        marker: null as google.maps.marker.AdvancedMarkerElement | null,
        lat: 41.0919565,
        lng: 29.0026607,
        show: false,
        markers: [
            {lat: 41.0919565, lng: 29.0026607, title: ""},
        ],

        get center() {
            return data.options.lat + ',' + data.options.lng;
        },

        async init() {
            await this.injectDynamicLibrary()
                .then(() => {
                    this.initMap();
                })
                .catch(() => console.log('fail'));
        },

        async initMap(): Promise<void> {
            const mapElement = document.getElementById("map") as HTMLElement;

            const [{Map}, {AdvancedMarkerElement}] = await Promise.all([
                google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
                google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
            ]);

            const map = this.map = new Map(mapElement, {
                center: {lat: this.lat, lng: this.lng},
                zoom: this.data.options.zoom,
                mapId: "DEMO_MAP_ID",
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });

            this.marker = new AdvancedMarkerElement({
                map,
                position: {lat: 41.0919565, lng: 29.0026607},
            });

            this.map.addListener('click', ({latLng}: {
                latLang: google.maps.LatLng
            }): void => this.setPosition({latLng}));
        },

        async injectDynamicLibrary(): Promise<void> {
            const script = document.createElement('script');

            script.textContent = '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({\n' +
                '    key: "' + data.options.apiKey + '",\n' +
                '    v: "weekly",\n' +
                '  });';

            script.async = true;
            script.defer = true;

            document.head.appendChild(script);
        },

        setPosition({latLng}: { latLng: google.maps.LatLng }): void {
            this.marker.position = latLng;
            this.lat = parseFloat(latLng.lat().toFixed(7));
            this.lng = parseFloat(latLng.lng().toFixed(7));
        }
    };
};
