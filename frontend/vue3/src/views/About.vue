<template>
  <div>
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[ state.latitude, state.longitude ]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
      <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[50, 50]" draggable @moveend="log('moveend')">
        <l-popup>
          lol
        </l-popup>
      </l-marker>

      <l-polyline
        :lat-lngs="[
          [35.8553843, 128.4924],
          [35.8554000, 128.4924],
          [35.8564043, 128.4924],
          [35.8574043, 128.4924],
          [35.8554043, 128.4924],
        ]"
        color="green"
      ></l-polyline>

    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { onBeforeMount, reactive } from 'vue';

export default {
  name: 'CalendarMap',
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
  },
  data() {
    return {
      zoom: 15,
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },

  method: {
    log(a) {
      console.log(a)
    }
  },
  
  setup() {

    onBeforeMount(() => {
      startMap()
    })


    const startMap = () => {
      if ("geolocation" in navigator) {	/* geolocation 사용 가능 */
			navigator.geolocation.getCurrentPosition(function(data) {
			
				var latitude = data.coords.latitude;
				var longitude = data.coords.longitude;
				
        // $('#latitude').text(latitude);
        state.latitude = latitude
        // $('#longitude').text(longitude);
        state.longitude = longitude
        console.log(state.latitude, state.longitude)

			}, function(error) {
				alert(error);
			}, {
				enableHighAccuracy: true,
				timeout: Infinity,
				maximumAge: 0
			});
		} else {	/* geolocation 사용 불가능 */
			alert('geolocation 사용 불가능');
		}
    }

    const state = reactive({
      latitude: 1.2,
      longitude: 1.3,
    })

    return {
      state,
    }
  }
};
</script>