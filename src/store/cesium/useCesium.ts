
import * as Cesium from 'cesium';
import { GeoJsonDataSource } from 'cesium';
import { ref, watch, Ref } from 'vue';
import { GeoJSON } from 'geojson';
import { rgdFootprint, rgdRegionSites } from '@/api/rest';


type Degrees = {
  longitude: number,
  latitude: number,
  height: number,
};

export default function useCesium(element?: Ref<HTMLElement | null>) {

  const cesiumViewer:Ref<any> = ref(null);


  // onMounted(async() => {
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
        // imageryProvider: false,
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
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.CreditDisplay.cesiumCredit = new Cesium.Credit('<a href="https://cesium.com/" target="_blank"><img src="cesium/Assets/Images/cesium_credit.png" title="CesiumJS"/></a>', true);

  // });

  const setDestination = (destination: Degrees) => {
    cesiumViewer.value.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(destination.longitude, destination.latitude, destination.height),
    });
  };



  const visibleFootprints = ref<Record<string, GeoJSON >>({});

  const addFootprint = async (spatialId:number, footprint?:GeoJSON, region?: boolean) => {
    let key= `result_${spatialId}` ;
    if(!footprint){
      let footprint;
      if (!region) {
        footprint = (await rgdFootprint(spatialId));
        key = `result_${spatialId}`;
      } else {
        footprint = await rgdRegionSites(spatialId);
        key = `region_${spatialId}`;
      }
      visibleFootprints.value = { ...visibleFootprints.value, [key]: footprint };
  }
    if (key && footprint) {
      visibleFootprints.value = { ...visibleFootprints.value, [key]: footprint };
    }
  };

  const removeFootprint = (spatialId: number, region?: boolean) => {
    let key: string;
    if (!region) {
      key = `result_${spatialId}`;
    } else {
      key = `region_${spatialId}`;
    }
    if (visibleFootprints.value[key]) {
      visibleFootprints.value = Object.fromEntries(
        Object.entries(visibleFootprints.value).filter(([k]) => k !== key),
      );
    }
  };

  const footprintSources: Record<string, GeoJsonDataSource> = {};

  const HUERISTIC_STATUS_DATA = {
    positive_annotated: '#000000',
    positive_partial: '#000000',
    positive_pending: '#000000',
    positive_excluded: '#006400',
    positive_unbounded: '#9400D3', // darkviolet
    negative: '#FF4500', // orangered
    negative_unbounded: '#FF1493', // deeppink
    ignore: '#FFA07A', // lightsalmon
  };

  const addGeojson = async (geojson: GeoJSON): Promise<GeoJsonDataSource> => {
    // cesiumViewer.value.dataSources.remove(source);
    const source = await cesiumViewer.value.dataSources.add(
      Cesium.GeoJsonDataSource.load(geojson),
    );
    // Change display properties for all entities in data source
    /* eslint-disable no-param-reassign */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source.entities.values.forEach(async (entity: {polygon: any; properties: any}) => {
      let color;
      if (entity.properties?.status && entity.properties.status?._value in HUERISTIC_STATUS_DATA) {
        const status = entity.properties.status?._value as keyof typeof HUERISTIC_STATUS_DATA;
        const colorV = HUERISTIC_STATUS_DATA[status];
        color = Cesium.Color.fromCssColorString(colorV).withAlpha(0.25);
      } else {
        color = Cesium.Color.fromRandom().withAlpha(0.25);
      }
      entity.polygon.height = 0;
      entity.polygon.material = color;
      entity.polygon.outlineColor = Cesium.Color.BLACK;
      // entity.polygon.outline = true;
      // entity.polygon.outlineWidth = 30; // WebGL issue - doesn't do anything
    });
    /* eslint-enable no-param-reassign */

    return source;
  };

  watch(visibleFootprints, (newFootprints, oldFootprints) => {
    Object.keys(oldFootprints).forEach(
      (key) => {
        if (!Object.keys(newFootprints).includes(key)) {
          // remove footprint
          if (key in footprintSources) {
            cesiumViewer.value.dataSources.remove(footprintSources[key]);
            delete footprintSources[key];
          }
        }
      },
    );
    Object.entries(newFootprints).forEach(
      async ([key, footprint]) => {
        if (!Object.keys(oldFootprints).includes(key)) {
          // add footprint
          footprintSources[key] = await addGeojson(footprint);
          cesiumViewer.value.flyTo(footprintSources[key], {
            offset: new Cesium.HeadingPitchRange(
              Cesium.Math.toRadians(0),
              Cesium.Math.toRadians(-90.0),
            ),
          });
        }
      },
    );
  });

  return  {
    cesiumViewer,
    setDestination,
    addFootprint,
    removeFootprint,
  };
}
