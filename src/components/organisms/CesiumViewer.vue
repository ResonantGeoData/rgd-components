
<script lang="ts">
import * as Cesium from 'cesium';
// import { GeoJsonDataSource } from 'cesium';

import { defineComponent, ref, onMounted, PropType, Ref, watchEffect } from 'vue';
import useCesium from '@/store/useCesium';
import { GeoJSON } from 'geojson';


type Degrees = {
  longitude: number,
  latitude: number,
  height: number,
};

export default defineComponent({
  name: 'CesiumViewer',
  props: {
    initialDestination: {
      type: Object as PropType<Degrees> | undefined,
      required: false,
    },
    footPrint: {
      type: Object as PropType<GeoJSON>,
      required: false,
      default:() => ({
        type: "Polygon",
        coordinates: [
          [
            [
              -84.14505029585798,
              39.808049541284404
            ],
            [
              -84.07694970414201,
              39.808049541284404
            ],
            [
              -84.07694970414201,
              39.75395045871559
            ],
            [
              -84.14505029585798,
              39.75395045871559
            ],
            [
              -84.14505029585798,
              39.808049541284404
            ]
          ]
        ]
      }),
    }
  },

  setup(props){
      // const cesiumViewer = ref();
    const map: Ref<null | HTMLElement> = ref(null);

    onMounted(async() =>{

      const {
        setDestination,
        addFootprint,
      } = useCesium(map);
      if(props.initialDestination){
      setDestination(props.initialDestination);
      }
      addFootprint(props.footPrint, 1);
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
