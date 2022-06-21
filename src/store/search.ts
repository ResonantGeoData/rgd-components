import { ref } from 'vue';
import {
  RGDResultList,
  RGDSearch,
} from './types';
import {
  rgdSearch,
} from '@/api/rest';

import { Polygon, MultiPolygon } from 'geojson';

export   const useMap = ref(false);

export const geometryInputSelection = ref();

export const drawnShape = ref<Polygon | MultiPolygon>({ type: 'Polygon', coordinates: [] });

export const searchResults = ref<RGDResultList>();
export const searchResultsTotal = ref<number>();


export const rgd_search = ref<RGDSearch>({
  searchLimit: 10,
  searchOffset: 0,
  specifiedShape: { type: 'Polygon', coordinates: [] },
  predicate: 'intersects',
  acquired: {
    startDate: null,
    endDate: null,
  },
  distance: {
    min: null,
    max: null,
  },
  instrumentation: null,
  time: {
    startTime: null,
    endTime: null,
  },
  collections: [],
  collectionIDs: [],
});

export const updateResults = async () => {
  // eslint-disable-next-line no-unused-expressions
  rgd_search.value.collections?.forEach((element) => {
    if (element.id) {
      rgd_search.value.collectionIDs.push(element.id);
    }
  });
  const res = await rgdSearch(rgd_search.value);
  searchResults.value = res.data.results;
  searchResultsTotal.value = res.data.count;
};
