<script lang="ts">
import {
  defineComponent,
} from 'vue';

import { rgd_search } from '@/store/search';

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
      rgd_search,
    };
  },
});

</script>

<template>
  <v-select
    :model="rgd_search.predicate"
    :items="predicate"
    label="Predicate"
    outlined
    dense
    value=""
    @input="$emit('input', rgd_search)"
  />
</template>
