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
      startDate: null,
      endDate: null,
    },
    time: {
      startTime: null,
      endTime: null,
    },
  });
