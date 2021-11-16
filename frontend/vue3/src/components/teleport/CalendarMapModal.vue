<template>
  <div class="modal" v-if="isOpen">
    <el-card class="box-card modal-map-content">
     
          <el-row>
            <el-col :span="24">
              <div class="modal-content-header">
                <div></div>
                <div>
                  <i class="el-icon-close modalIcon" @click="hide"></i>
                </div>
              </div>
            </el-col>
          </el-row>

      <el-row>
        <el-col>
          <el-button @click="findWayWalking" type="primary" plain>도보</el-button>
          <el-button @click="findWayCar" type="primary" plain>차량</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <!-- {{ curWay }} -->
          <el-button v-for="way in state.curWay" :key="way.instanceId" @click="choiceWay(way, state.isWay)" type="primary" plain>경로</el-button>
          
        </el-col>
      </el-row>

      <div 
        v-if="state.goal.Lat"
        class="modal-map">
        
        <l-map
          v-model="state.zoom"
          v-model:zoom="state.zoom"
          ref="userMap"
          :center="[ state.latitude, state.longitude ]">

          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
          </l-tile-layer>
          <l-control-layers />

          <!-- start -->
          <l-marker :lat-lng="[state.latitude, state.longitude]" draggable>
            <l-tooltip>
              start
            </l-tooltip>
          </l-marker>

          <!-- end -->
          <l-marker
            :lat-lng="[state.goal.Lat, state.goal.Lng]">
            <l-tooltip>
              end
            </l-tooltip>
          </l-marker>

          <l-polyline
            v-if="state.isWay === 'foot' && state.curFootCourse.length > 0"
            :lat-lngs="state.curFootCourse"
            color="red">
          </l-polyline>

          <l-polyline
            v-if="state.isWay === 'car' && state.curDriveCourse.length > 0"
            :lat-lngs="state.curDriveCourse"
            color="blue">
          </l-polyline>

        </l-map>
        <!-- {{state.curCourse }} -->
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
import axios from 'axios';

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
  setup() {

    const store = useStore()
    
    const isOpen = ref(false)
    const userMap = ref(null)

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

    const findWayWalking = () => {
      axios.get(`http://k5d105.p.ssafy.io:5010/route/v1/driving/${state.longitude},${state.latitude};${state.goal.Lng},${state.goal.Lat}?steps=true`)
        .then((response) => {
          // console.log(response.data.routes)

          const data = [];
          let idCount = 0;

          response.data.routes.forEach((res) => {
            res.legs.forEach((r) => {
              data.push({
                instanceId : idCount,
                distance: r.distance,
                duration: r.duration,
                steps: r.steps
              })
              idCount = idCount + 1
            });
          });

          state.curWay = data
          state.isWay = 'foot'
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const findWayCar = () => {
      axios.get(`http://k5d105.p.ssafy.io:5000/route/v1/driving/${state.longitude},${state.latitude};${state.goal.Lng},${state.goal.Lat}?steps=true`)
        .then((response) => {

          const data = [];
          let idCount = 0;

          response.data.routes.forEach((res) => {
            res.legs.forEach((r) => {
              data.push({
                distance: r.distance,
                duration: r.duration,
                steps: r.steps
              })
              idCount = idCount + 1
            });
          });
          state.curWay = data
          state.isWay = 'car'
          // console.log(state.curWay)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const choiceWay = (course, way) => {

      const data = [];
      course.steps.forEach((element) => {
        element.intersections.forEach((ele) => {
          data.push([ele.location[1], ele.location[0]] )
        });
      });


      if (way === 'foot') {
        state.curFootCourse = data
      } else if ( way === 'car') {
        state.curDriveCourse = data  
      }


      // console.log(state.curCourse)
    }

    const state = reactive({
      latitude: 1.2,
      longitude: 1.3,
      goal: computed(() => store.state.calendarMapGoal),
      zoom: 15,
      curWay: [],
      curFootCourse: [],
      curDriveCourse: [],
      isWay: '',
    })

    return {
      state,
      isOpen,
      hide,
      show,
      findWayWalking,
      findWayCar,
      userMap,
      choiceWay,
    }
  }
};
</script>

<style>

  .modal-map {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-map-content {
    background-color: #ffffff;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
  }

  @media screen and (min-width: 1200px) {
    .modal-map {
      width: 850px;
      height: 500px;
    }

    .modal-map-content {
      width: 900px;
      height: 700px;
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 993px) {
    .modal-map {
      width: 850px;
      height: 500px;
    }

    .modal-map-content {
      width: 900px;
      height: 700px;
    }
  }

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .modal-map {
      width: 650px;
      height: 500px;
    }
    .modal-map-content {
      width: 700px;
      height: 600px;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    .modal-map {
      width: 400px;
      height: 300px;
    }
    
    .modal-map-content {
      width: 450px;
      height: 350px;
    }
    
  }

  @media screen and (max-width: 499px) {
    .modal-map {
      width: 330px;
      height: 270px;
    }

    .modal-map-content {
      width: 380px;
      height: 300px;
    }
  }
</style>