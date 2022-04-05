
<script lang="ts">
import * as Cesium from 'cesium';
import { defineComponent, ref, onMounted, PropType } from 'vue';
type Degrees = {
  longitude: number,
  latitude: number,
  height: number,
};

export default defineComponent({
  name: 'CesiumViewer',
  props: {
    initialDestination: {
      type: Object as PropType<Degrees>,
      required: false,
      default:() => ({longitude: -93.849688, latitude: 40.690265, height: 4000000})
    }
  },

  setup(props){
      const cesiumViewer = ref();

    onMounted(async() => {
      // Create ProviderViewModel based on different imagery sources
      // - these can be used without Cesium Ion
      const imageryViewModels = [];

      /* Stamen's website (http://maps.stamen.com) as of 2019-08-28 says that the
       * maps they host may be used free of charge.  For http access, use a url like
       * http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png */
      const StamenAttribution = 'Map tiles by <a href="http://stamen.com">Stamen '
        + 'Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">'
        + 'CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap'
        + '</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';

      /* Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps */
      const CartoAttribution = 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.';

      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'OpenStreetMap',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
        tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.\nhttp://www.openstreetmap.org',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: 'abc',
            minimumLevel: 0,
            maximumLevel: 19,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Positron',
        tooltip: 'CartoDB Positron basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/light_all/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Positron without labels',
        tooltip: 'CartoDB Positron without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/light_nolabels/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Dark Matter',
        tooltip: 'CartoDB Dark Matter basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_all/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Dark Matter without labels',
        tooltip: 'CartoDB Dark Matter without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Voyager',
        tooltip: 'CartoDB Voyager basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Voyager without labels',
        tooltip: 'CartoDB Voyager without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'National Map Satellite',
        tooltip: 'National Map Satellite',
        iconUrl: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/4/6/4',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
            credit: 'Tile data from <a href="https://basemap.nationalmap.gov/">USGS</a>',
            minimumLevel: 0,
            maximumLevel: 16,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Stamen Terrain',
        tooltip: 'Stamen Terrain',
        iconUrl: 'https://stamen-tiles-a.a.ssl.fastly.net/terrain/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
            credit: StamenAttribution,
            subdomains: 'abcd',
            minimumLevel: 0,
            maximumLevel: 14,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Stamen Terrain Background',
        tooltip: 'Stamen Terrain Background',
        iconUrl: 'https://stamen-tiles-a.a.ssl.fastly.net/terrain-background/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png',
            credit: StamenAttribution,
            subdomains: 'abcd',
            minimumLevel: 0,
            maximumLevel: 14,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Stamen Toner',
        tooltip: 'Stamen Toner',
        iconUrl: 'https://stamen-tiles-a.a.ssl.fastly.net/toner/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            credit: StamenAttribution,
            subdomains: 'abcd',
            minimumLevel: 0,
            maximumLevel: 14,
          });
        },
      }));
      imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Stamen Toner Lite',
        tooltip: 'Stamen Toner Lite',
        iconUrl: 'https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/5/15/12.png',
        creationFunction() {
          return new Cesium.UrlTemplateImageryProvider({
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png',
            credit: StamenAttribution,
            subdomains: 'abcd',
            minimumLevel: 0,
            maximumLevel: 14,
          });
        },
      }));
        // Initialize the viewer - this works without a token
      cesiumViewer.value = new Cesium.Viewer('cesiumContainer',{
          imageryProvider: false,
          imageryProviderViewModels: imageryViewModels,
          selectedImageryProviderViewModel: imageryViewModels[5], // Voyager
          animation: false,
          // timeline: true,
          infoBox: false,
          homeButton: false,
          fullscreenButton: false,
          selectionIndicator: false,
          geocoder: false,

      });
      // Remove the Terrain section of the baseLayerPicker
      cesiumViewer.value.baseLayerPicker.viewModel.terrainProviderViewModels.removeAll();
      cesiumViewer.value.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(props.initialDestination.longitude, props.initialDestination.latitude, props.initialDestination.height),
      });
      Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    });
  },
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
/* #cesiumContainer.draw-mode{
  cursor: crosshair
} */
/* .cesium-viewer-timelineContainer {
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
} */
</style>
