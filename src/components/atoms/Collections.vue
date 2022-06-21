
<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';
import { rgd_search } from '@/store/search';
import { rgdCollections } from '@/api/rest';

export default defineComponent({
  name: 'CollectionsComponent',
  emits: {'input': null},

  setup() {
    const collections = ref([]);
    rgdCollections().then((result) => {
      collections.value = result;
    });
    return {
      collections,
      rgd_search,
    };
  },
});
</script>

<template>
  <v-combobox
    v-model="rgd_search.collections"
    label="Collections"
    :items="collections"
    :item-text="'name'"
    :item-value="'id'"
    outlined
    multiple
    dense
    @input="$emit('input', rgd_search)"
  />
</template>
