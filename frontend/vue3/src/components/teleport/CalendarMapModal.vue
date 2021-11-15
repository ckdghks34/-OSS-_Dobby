<template>
  <div class="modal" v-if="isOpen">
    <el-card class="box-card modal-map-content">
      <template #header>
        <div v-if="state.isBig">
          <el-row>
            <el-col :span="22" :offset="1">
              <div class="modal-content-header">
                <div>
                  <i class="el-icon-close modalIcon" @click="hide"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>

      <div v-if="state.goal.Lat" class="modal-map">
        <l-map
          style="width: 700px; height: 700px"
          v-model="zoom"
          v-model:zoom="zoom"
          :center="[ state.latitude, state.longitude ]">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
          </l-tile-layer>
          <l-control-layers />

          <l-marker :lat-lng="[state.latitude, state.longitude]" draggable>
            <l-tooltip>
              start
            </l-tooltip>
          </l-marker>

          <l-marker
            :lat-lng="[state.goal.Lat, state.goal.Lng]">
            <l-tooltip>
              end
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
    </el-card>
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
import { computed, onBeforeMount, onUnmounted, reactive, ref } from 'vue';
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
    };
  },

  method: {
    log(a) {
      console.log(a)
    }
  },
  
  setup() {

    const store = useStore()
    
    const isOpen = ref(false)

    const hide = () => {
      isOpen.value = false;
    };

    const show = () => {
      isOpen.value = true;
    };

    onBeforeMount(() => {
      startMap()
      window.addEventListener('resize', handleMapModalWindowSize)
      handleMapModalWindowSize()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', handleMapModalWindowSize)
    })

    // onMounted(() => {
    // })

    const handleMapModalWindowSize = () => {
      if (window.innerWidth > 767) {
        state.isBig = true
      } else {
        state.isBig = false
      }
    }


    const startMap = () => {
      if ("geolocation" in navigator) {	/* geolocation 사용 가능 */
        navigator.geolocation.getCurrentPosition(function(data) {
			
				var latitude = data.coords.latitude;
				var longitude = data.coords.longitude;
				
        state.latitude = latitude
        state.longitude = longitude
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
      isOpen,
      hide,
      show,
    }
  }
};
</script>

<style>
  .modal-map {
    width: 850px;
    height: 500px;
  }

  .modal-map-content {
    background-color: #ffffff;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
  }

  @media screen and (min-width: 1200px) {
    .modal-map-content {
      width: 900px;
      height: 700px;
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 993px) {
    .modal-map-content {
      width: 900px;
      height: 750px;
    }
  }

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .modal-map-content {
      width: 700px;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    .modal-map-content {
      width: 450px;
    }
  }

  @media screen and (max-width: 499px) {
    .modal-map-content {
      width: 380px;
    }
  }
</style>