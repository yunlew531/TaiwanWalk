<template>
  <div class="w-full h-64 rounded-xl overflow-hidden mb-3">
    <div id="map-wrap" class="h-full" />
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Leaflet',
  props: {
    position: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data () {
    return {
      map: null,
      redIcon: null
    }
  },
  mounted () {
    this.creatRedIcon()
    this.createMap()
  },
  methods: {
    createMap () {
      const position = [this.position.PositionLat, this.position.PositionLon]
      /* eslint-disable */
      const map = L.map('map-wrap').setView(position, 15)
      L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }).addTo(map)
      L.marker(position, { icon: this.redIcon }).addTo(map)
      /* eslint-enable */
      this.map = map
    },
    creatRedIcon () {
      // eslint-disable-next-line
      this.redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }
  }
}
</script>
