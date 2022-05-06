<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {
  updateResults,
} from '@/store/search';

export default defineComponent({
  name: 'Search',
  setup(){
    return {
      updateResults,
    };
  }
});
</script>

<template>
  <v-card
    flat
    color="blue-grey darken-4"
  >
    <v-form
      @submit.prevent="updateResults()"
    >
      <v-row justify="center">
        <v-col cols="11">
          <v-card-subtitle>Specify search area</v-card-subtitle>
          <!-- <GeoJsonForm /> -->
          <v-card-subtitle>Apply search logic</v-card-subtitle>
          <!-- <Predicate /> -->
          <v-card-subtitle>Acquired date range</v-card-subtitle>
          <!-- <DateRange /> -->

          <v-btn
            color="primary"
            block
            x-large
            type="submit"
            class="mt-6"
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
