
<script lang="ts">

import { defineComponent, ref, onMounted, PropType, Ref } from 'vue';
import useCesium from '@/store/cesium/useCesium';
import { Location, Footprint } from '@/store/types';



export default defineComponent({
  name: 'CesiumViewer',
  props: {
    initialDestination: {
      type: Object as PropType<Location>,
      required: false,
      default:() => ({
        'longitude': -93.849688,
        'latitude': 40.690265,
        'height': 4000000
      })
    },
    addFootPrint: {
      type: Object as PropType<Footprint>,
      required: false,
    },
    removeFootPrint: {
      type: Number,
      required: false,
    }
  },

  setup(props){
    const map: Ref<null | HTMLElement> = ref(null);

    onMounted(async() =>{

      const {
        setDestination,
        addFootprint,
        removeFootprint,
      } = useCesium(map);

      if(props.initialDestination.longitude){
      setDestination(props.initialDestination);
      }

      if(props.addFootPrint?.geoFootPrint){
        addFootprint(props.addFootPrint.spatialID, props.addFootPrint.geoFootPrint);
      }

      if(props.removeFootPrint){
        removeFootprint(props.removeFootPrint,);
      }


      });

  },
});
</script>

<template>
  <div
    id="cesiumContainer"
    ref="map"
  />
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
