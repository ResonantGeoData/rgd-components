
<script lang="ts">
import * as Cesium from 'cesium';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CesiumViewer',
 });
  const cesiumViewer = ref();

 onMounted(() => {
    // Initialize the viewer - this works without a token
    cesiumViewer.value = new Cesium.Viewer('cesiumContainer');
    // , {
    //   // imageryProvider: false,
    //   // imageryProviderViewModels: imageryViewModels,
    //   // selectedImageryProviderViewModel: imageryViewModels[5], // Voyager
    //   // animation: false,
    //   // timeline: true,
    //   // infoBox: false,
    //   // homeButton: false,
    //   // fullscreenButton: false,
    //   // selectionIndicator: false,
    //   // geocoder: false,

    // });
 });
</script>

<template>
  <div
    id="cesiumContainer"
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
</style>
