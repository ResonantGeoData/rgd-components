import {ref} from 'vue';
import {
    ResultsFilter,
  } from './types';
export const resultsFilter = ref<ResultsFilter>({
    distance: {
      min: null,
      max: null,
    },
    instrumentation: null,
    collections: [],
    acquired: {
      start: null,
      end: null,
    },
    time: {
      startTime: null,
      endTime: null,
    },
  });
