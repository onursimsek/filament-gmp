// resources/js/filament-gmp.ts
function filamentGmp({ state, data = {} }) {
  return {
    state,
    data,
    map: null,
    marker: null,
    lat: 41.0919565,
    lng: 29.0026607,
    show: false,
    markers: [
      { lat: 41.0919565, lng: 29.0026607, title: "" }
    ],
    get center() {
      return data.options.lat + "," + data.options.lng;
    },
    async init() {
      await this.injectDynamicLibrary().then(() => {
        this.initMap();
      }).catch(() => console.log("fail"));
    },
    async initMap() {
      const mapElement = document.getElementById("map");
      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("marker")
      ]);
      const map = this.map = new Map(mapElement, {
        center: { lat: this.lat, lng: this.lng },
        zoom: this.data.options.zoom,
        mapId: "DEMO_MAP_ID",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      this.marker = new AdvancedMarkerElement({
        map,
        position: { lat: 41.0919565, lng: 29.0026607 }
      });
      this.map.addListener("click", ({ latLng }) => this.setPosition({ latLng }));
    },
    async injectDynamicLibrary() {
      const script = document.createElement("script");
      script.textContent = '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({\n    key: "' + data.options.apiKey + '",\n    v: "weekly",\n  });';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    },
    setPosition({ latLng }) {
      this.marker.position = latLng;
      this.lat = parseFloat(latLng.lat().toFixed(7));
      this.lng = parseFloat(latLng.lng().toFixed(7));
    }
  };
}
export {
  filamentGmp as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvZmlsYW1lbnQtZ21wLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaWxhbWVudEdtcCh7c3RhdGUsIGRhdGEgPSB7fX06IHsgc3RhdGU6IGFueSwgZGF0YTogb2JqZWN0IH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0ZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgbWFwOiBudWxsIGFzIGdvb2dsZS5tYXBzLk1hcCB8IG51bGwsXG4gICAgICAgIG1hcmtlcjogbnVsbCBhcyBnb29nbGUubWFwcy5tYXJrZXIuQWR2YW5jZWRNYXJrZXJFbGVtZW50IHwgbnVsbCxcbiAgICAgICAgbGF0OiA0MS4wOTE5NTY1LFxuICAgICAgICBsbmc6IDI5LjAwMjY2MDcsXG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICBtYXJrZXJzOiBbXG4gICAgICAgICAgICB7bGF0OiA0MS4wOTE5NTY1LCBsbmc6IDI5LjAwMjY2MDcsIHRpdGxlOiBcIlwifSxcbiAgICAgICAgXSxcblxuICAgICAgICBnZXQgY2VudGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEub3B0aW9ucy5sYXQgKyAnLCcgKyBkYXRhLm9wdGlvbnMubG5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluamVjdER5bmFtaWNMaWJyYXJ5KClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IGNvbnNvbGUubG9nKCdmYWlsJykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIGluaXRNYXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgICBjb25zdCBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIikgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IFt7TWFwfSwge0FkdmFuY2VkTWFya2VyRWxlbWVudH1dID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmltcG9ydExpYnJhcnkoJ21hcHMnKSBhcyBQcm9taXNlPGdvb2dsZS5tYXBzLk1hcHNMaWJyYXJ5PixcbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5pbXBvcnRMaWJyYXJ5KCdtYXJrZXInKSBhcyBQcm9taXNlPGdvb2dsZS5tYXBzLk1hcmtlckxpYnJhcnk+LFxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwID0gbmV3IE1hcChtYXBFbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgY2VudGVyOiB7bGF0OiB0aGlzLmxhdCwgbG5nOiB0aGlzLmxuZ30sXG4gICAgICAgICAgICAgICAgem9vbTogdGhpcy5kYXRhLm9wdGlvbnMuem9vbSxcbiAgICAgICAgICAgICAgICBtYXBJZDogXCJERU1PX01BUF9JRFwiLFxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IEFkdmFuY2VkTWFya2VyRWxlbWVudCh7XG4gICAgICAgICAgICAgICAgbWFwLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7bGF0OiA0MS4wOTE5NTY1LCBsbmc6IDI5LjAwMjY2MDd9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKCdjbGljaycsICh7bGF0TG5nfToge1xuICAgICAgICAgICAgICAgIGxhdExhbmc6IGdvb2dsZS5tYXBzLkxhdExuZ1xuICAgICAgICAgICAgfSk6IHZvaWQgPT4gdGhpcy5zZXRQb3NpdGlvbih7bGF0TG5nfSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIGluamVjdER5bmFtaWNMaWJyYXJ5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIHNjcmlwdC50ZXh0Q29udGVudCA9ICcoZz0+e3ZhciBoLGEsayxwPVwiVGhlIEdvb2dsZSBNYXBzIEphdmFTY3JpcHQgQVBJXCIsYz1cImdvb2dsZVwiLGw9XCJpbXBvcnRMaWJyYXJ5XCIscT1cIl9faWJfX1wiLG09ZG9jdW1lbnQsYj13aW5kb3c7Yj1iW2NdfHwoYltjXT17fSk7dmFyIGQ9Yi5tYXBzfHwoYi5tYXBzPXt9KSxyPW5ldyBTZXQsZT1uZXcgVVJMU2VhcmNoUGFyYW1zLHU9KCk9Pmh8fChoPW5ldyBQcm9taXNlKGFzeW5jKGYsbik9Pnthd2FpdCAoYT1tLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpO2Uuc2V0KFwibGlicmFyaWVzXCIsWy4uLnJdK1wiXCIpO2ZvcihrIGluIGcpZS5zZXQoay5yZXBsYWNlKC9bQS1aXS9nLHQ9PlwiX1wiK3RbMF0udG9Mb3dlckNhc2UoKSksZ1trXSk7ZS5zZXQoXCJjYWxsYmFja1wiLGMrXCIubWFwcy5cIitxKTthLnNyYz1gaHR0cHM6Ly9tYXBzLiR7Y31hcGlzLmNvbS9tYXBzL2FwaS9qcz9gK2U7ZFtxXT1mO2Eub25lcnJvcj0oKT0+aD1uKEVycm9yKHArXCIgY291bGQgbm90IGxvYWQuXCIpKTthLm5vbmNlPW0ucXVlcnlTZWxlY3RvcihcInNjcmlwdFtub25jZV1cIik/Lm5vbmNlfHxcIlwiO20uaGVhZC5hcHBlbmQoYSl9KSk7ZFtsXT9jb25zb2xlLndhcm4ocCtcIiBvbmx5IGxvYWRzIG9uY2UuIElnbm9yaW5nOlwiLGcpOmRbbF09KGYsLi4ubik9PnIuYWRkKGYpJiZ1KCkudGhlbigoKT0+ZFtsXShmLC4uLm4pKX0pKHtcXG4nICtcbiAgICAgICAgICAgICAgICAnICAgIGtleTogXCInICsgZGF0YS5vcHRpb25zLmFwaUtleSArICdcIixcXG4nICtcbiAgICAgICAgICAgICAgICAnICAgIHY6IFwid2Vla2x5XCIsXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgfSk7JztcblxuICAgICAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5kZWZlciA9IHRydWU7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRQb3NpdGlvbih7bGF0TG5nfTogeyBsYXRMbmc6IGdvb2dsZS5tYXBzLkxhdExuZyB9KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlci5wb3NpdGlvbiA9IGxhdExuZztcbiAgICAgICAgICAgIHRoaXMubGF0ID0gcGFyc2VGbG9hdChsYXRMbmcubGF0KCkudG9GaXhlZCg3KSk7XG4gICAgICAgICAgICB0aGlzLmxuZyA9IHBhcnNlRmxvYXQobGF0TG5nLmxuZygpLnRvRml4ZWQoNykpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixZQUE2QixFQUFDLE9BQU8sT0FBTyxDQUFDLEVBQUMsR0FBaUM7QUFDbEYsU0FBTztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDTCxFQUFDLEtBQUssWUFBWSxLQUFLLFlBQVksT0FBTyxHQUFFO0FBQUEsSUFDaEQ7QUFBQSxJQUVBLElBQUksU0FBUztBQUNULGFBQU8sS0FBSyxRQUFRLE1BQU0sTUFBTSxLQUFLLFFBQVE7QUFBQSxJQUNqRDtBQUFBLElBRUEsTUFBTSxPQUFPO0FBQ1QsWUFBTSxLQUFLLHFCQUFxQixFQUMzQixLQUFLLE1BQU07QUFDUixhQUFLLFFBQVE7QUFBQSxNQUNqQixDQUFDLEVBQ0EsTUFBTSxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUM7QUFBQSxJQUN4QztBQUFBLElBRUEsTUFBTSxVQUF5QjtBQUMzQixZQUFNLGFBQWEsU0FBUyxlQUFlLEtBQUs7QUFFaEQsWUFBTSxDQUFDLEVBQUMsSUFBRyxHQUFHLEVBQUMsc0JBQXFCLENBQUMsSUFBSSxNQUFNLFFBQVEsSUFBSTtBQUFBLFFBQ3ZELE9BQU8sS0FBSyxjQUFjLE1BQU07QUFBQSxRQUNoQyxPQUFPLEtBQUssY0FBYyxRQUFRO0FBQUEsTUFDdEMsQ0FBQztBQUVELFlBQU0sTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLFlBQVk7QUFBQSxRQUN2QyxRQUFRLEVBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLElBQUc7QUFBQSxRQUNyQyxNQUFNLEtBQUssS0FBSyxRQUFRO0FBQUEsUUFDeEIsT0FBTztBQUFBLFFBQ1AsZ0JBQWdCO0FBQUEsUUFDaEIsbUJBQW1CO0FBQUEsUUFDbkIsbUJBQW1CO0FBQUEsTUFDdkIsQ0FBQztBQUVELFdBQUssU0FBUyxJQUFJLHNCQUFzQjtBQUFBLFFBQ3BDO0FBQUEsUUFDQSxVQUFVLEVBQUMsS0FBSyxZQUFZLEtBQUssV0FBVTtBQUFBLE1BQy9DLENBQUM7QUFFRCxXQUFLLElBQUksWUFBWSxTQUFTLENBQUMsRUFBQyxPQUFNLE1BRTFCLEtBQUssWUFBWSxFQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDMUM7QUFBQSxJQUVBLE1BQU0sdUJBQXNDO0FBQ3hDLFlBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUU5QyxhQUFPLGNBQWMsZ3JCQUNGLEtBQUssUUFBUSxTQUFTO0FBSXpDLGFBQU8sUUFBUTtBQUNmLGFBQU8sUUFBUTtBQUVmLGVBQVMsS0FBSyxZQUFZLE1BQU07QUFBQSxJQUNwQztBQUFBLElBRUEsWUFBWSxFQUFDLE9BQU0sR0FBeUM7QUFDeEQsV0FBSyxPQUFPLFdBQVc7QUFDdkIsV0FBSyxNQUFNLFdBQVcsT0FBTyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsV0FBSyxNQUFNLFdBQVcsT0FBTyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
