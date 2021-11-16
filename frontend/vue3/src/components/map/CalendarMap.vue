<template>
  <div  v-if="state.goal.Lat">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[ state.latitude, state.longitude ]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
      <!-- <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')"> -->

      <l-marker :lat-lng="[state.latitude, state.longitude]" draggable>
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker>

      <l-marker
        :lat-lng="[state.goal.Lat, state.goal.Lng]">
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker>


      <l-polyline
       
        :lat-lngs="[
          [state.latitude, state.longitude],
          [state.goal.Lat, state.goal.Lng]
        ]"
        color="green"
      ></l-polyline>

    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { computed, onBeforeMount, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CalendarMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
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

    const store = useStore()
    

    onBeforeMount(() => {
      startMap()
    })

    onMounted(() => {
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
      goal: computed(() => store.state.calendarMapGoal)
    })

    return {
      state,
    }
  }
};
</script>