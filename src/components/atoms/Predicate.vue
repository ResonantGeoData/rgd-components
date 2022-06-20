<script lang="ts">
import {
  defineComponent,
} from 'vue';

import { searchParameters } from '@/store/search';

export default defineComponent({
  name: 'Predicate',
  emits: {'input': null},
  setup() {
    const predicate = [
      'within',
      'contains',
      'crosses',
      'disjoint',
      'equals',
      'intersects',
      'overlaps',
      'touches',
    ];

    return {
      predicate,
      searchParameters,
    };
  },
});

</script>

<template>
  <v-select
    :model="searchParameters.predicate"
    :items="predicate"
    label="Predicate"
    outlined
    dense
    value=""
    @input="$emit('input', searchParameters)"
  />
</template>
