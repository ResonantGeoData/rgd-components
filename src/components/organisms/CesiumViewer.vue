
<script lang="ts">
import * as Cesium from 'cesium';

import { defineComponent, ref, onMounted, PropType, Ref, watchEffect, watch } from 'vue';
import useCesium from '@/store/useCesium';
import { Degrees } from '@/store/types';
import { GeoJSON } from 'geojson';


export default defineComponent({
  name: 'CesiumViewer',
  props: {
    initialDestination: {
      type: Object as PropType<Degrees>,
      required: false,
      default:() => ({
        'longitude': -93.849688,
        'latitude': 40.690265,
        'height': 4000000
      })
    },
    footPrint: {
      type: Object as PropType<GeoJSON>,
      required: false,
    }
  },

  setup(props){
    const map: Ref<null | HTMLElement> = ref(null);

    onMounted(async() =>{

      const {
        setDestination,
        addFootprint,
      } = useCesium(map);
      if(props.initialDestination.longitude){
      setDestination(props.initialDestination);
      }
      if(props.footPrint?.type){
        addFootprint(props.footPrint, 1);
        }

      });

  },
});
</script>

<template>
  <div
    id="cesiumContainer"
    ref="map"
  >
    <!-- <v-dialog
      v-model="dialog"
      open-on-hover
      right
      max-width="300px"
    >
      <v-card>
        <v-simple-table
          class="px-5"
        >
          <tbody>
            <tr
              v-for="(value, key) in properties"
              :key="key"
            >
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<style>
#cesiumContainer{
  width: 100% !important;
  height: calc(100vh - 48px) !important;
  cursor: grab;
}
#cesiumContainer.draw-mode{
  cursor: crosshair
}
.cesium-viewer-timelineContainer {
  height: 50px;
  font-size: 20px;
}
.cesium-timeline-main {
  border: none;
}
.cesium-timeline-bar {
  cursor: pointer;
  height: 3em;
  background-color: #1E1E1E;
}
.cesium-timeline-needle {
  top: 1em;
  width: 2px;
}
.cesium-timeline-icon16 {
  background-image: none;
}
</style>
