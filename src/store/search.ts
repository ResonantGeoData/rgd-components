import { ref } from 'vue';
import {
  RGDResultList,
  SearchParameters,
  ResultsFilter,
} from './types';
import {
  rgdSearch,
} from '@/api/rest';

import { Polygon, MultiPolygon } from 'geojson';


export const searchLimit = ref<number>(10);

export const searchOffset = ref<number>(0);
export const specifiedShape = ref<Polygon | MultiPolygon>({ type: 'Polygon', coordinates: [] });
export const searchResults = ref<RGDResultList>();
export const searchResultsTotal = ref<number>();
export const searchParameters = ref<SearchParameters>({
  predicate: 'intersects',
  acquired: {
    startDate: null,
    endDate: null,
    startDateModal: false,
    endDateModal: false,
  },
});


export const resultsFilter = ref<ResultsFilter>({
  distance: {
    min: null,
    max: null,
  },
  instrumentation: null,
  collections: [],
  time: {
    startTime: null,
    endTime: null,
    startTimeModal: false,
    endTimeModal: false,
  },
});

export const updateResults = async () => {
  const collectionIDs: number[] = [];
  // eslint-disable-next-line no-unused-expressions
  resultsFilter.value.collections?.forEach((element) => {
    if (element.id) {
      collectionIDs.push(element.id);
    }
  });
  const res = await rgdSearch(
    searchLimit.value,
    searchOffset.value,
    specifiedShape.value,
    searchParameters.value.predicate,
    searchParameters.value.acquired.startDate,
    searchParameters.value.acquired.endDate,
    resultsFilter.value.distance.min,
    resultsFilter.value.distance.max,
    resultsFilter.value.instrumentation,
    resultsFilter.value.time.startTime,
    resultsFilter.value.time.endTime,
    collectionIDs,

  );
  searchResults.value = res.data.results;
  searchResultsTotal.value = res.data.count;
};
