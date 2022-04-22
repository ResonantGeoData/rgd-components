<script lang="ts">
import {
  defineComponent, reactive, watch, toRefs,
} from 'vue';
// import { clearMetaDataDrawer } from '@/store';
// import {
//   regionsLimit,
//   regionsOffset,
//   updateResults,
//   selectResultForMetadataDrawer,
//   updateRegions,
//   regionsList,
//   regionsTotal,
//   sitesFilter,
//   updateSites,
//   specifiedShape,
// } from '@/store/search';
// import { RegionResult } from '@/store/types';
// import {
//   addFootprint,
//   removeFootprint,
// } from '@/store/cesium/footprints';
import { Polygon, MultiPolygon } from 'geojson';  // eslint-disable-line
// import type { DataOptions } from 'vuetify';
import FilterMenu from '../molecules/Filters.vue';
import FocusedData from '../molecules/FocusedData.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Regions',
  props: {
    regions: {
      type: Boolean,
      required: false,
    },
  },
  // components: {
  //   FilterMenu,
  //   FocusedData,
  // },

  setup(props) {
    // const selected: RegionResult[] = [];
    // let previous: RegionResult;
    const originatorOptions = ['all', 'te', 'kitware'];

    // const tableOptions = reactive({
    //   page: 1,
    //   itemsPerPage: 10,
    // } as DataOptions);

    const headers = [
      {
        text: 'Name',
        value: 'region_id',
        sortable: false,
      },
      {
        text: 'Originator',
        value: 'properties.originator',
        align: 'center',
        width: '30%',
        sortable: false,
      },
      {
        text: '',
        value: 'show_metadata',
        align: 'end',
        width: '1',
        sortable: false,
      },
    ];

    const itemsPerPageOptions = [5, 10, 15];

    // const updateOptions = () => {
    //   const { page, itemsPerPage } = tableOptions;
    //   regionsLimit.value = itemsPerPage;
    //   regionsOffset.value = (page - 1) * itemsPerPage;
    //   updateRegions();
    // };

    // watch(tableOptions, updateOptions, {
    //   deep: true,
    // });

    // const toggleValue = (fieldName: string, regionId: number, value?: boolean) => {
    //   let addFunc;
    //   let removeFunc;
    //   if (fieldName === 'show_metadata') {
    //     addFunc = selectResultForMetadataDrawer;
    //     removeFunc = clearMetaDataDrawer;
    //   }

    //   if (value && addFunc) {
    //     addFunc(regionId, props.regions);
    //   } else if (removeFunc) {
    //     removeFunc(regionId, props.regions);
    //   }
    //   if (!regionsList.value) return null;
    //   regionsList.value = regionsList.value.map(
    //     (entry) => {
    //       if (entry.id === regionId) {
    //         return { ...entry, [fieldName]: value };
    //       }
    //       return entry;
    //     },
    //   );

    //   return null;
    // };

    // const useRegionForSearch = (region: RegionResult) => {
    //   if (previous) {
    //     removeFootprint(previous.id, true);
    //   }
    //   // searchParameters.value = {
    //   //   ...searchParameters.value,
    //   //   acquired: {
    //   //     ...searchParameters.value.acquired,
    //   //     startDate: region.start_date,
    //   //     endDate: region.end_date,
    //   //   },
    //   // };
    //   specifiedShape.value = region.footprint as Polygon | MultiPolygon;
    //   updateResults();
    //   addFootprint(region.id, true);
    //   previous = region;
    // };

    return {
      props,
      // regionsList,
      // regionsTotal,
      // ...toRefs(tableOptions),
      headers,
      // toggleValue,
      itemsPerPageOptions,
      originatorOptions,
      // sitesFilter,
      // updateSites,
      // useRegionForSearch,
      // selected,
    };
  },
});

</script>

<template>
  <v-data-table

    :headers="headers"
    :footer-props="{ itemsPerPageOptions }"
    :class="'px-4'"
    :show-select="props.regions ? true : false"
    :single-select="props.regions ? true : false"
    dense
    calculate-widths
  >
    <!-- eslint-disable-next-line -->
    <template #item.show_metadata="{item}">
      <v-simple-checkbox
        v-ripple
        dark
        off-icon="mdi-chevron-right"
        on-icon="mdi-chevron-left"
        :value="item.show_metadata"
      />
    </template>
  </v-data-table>
</template>

  <style>
    .data-type-icon {
    max-height: 25px;
    filter: invert(100%);
    }

    td {
    padding: 0px 5px!important;
    }
  </style>
