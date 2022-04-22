<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'DataPanel',

  setup() {
    const selectedTab = ref();
    const clearMetaDataDrawer= () => {
      console.log('boop');
    };

    return {
      selectedTab,
      clearMetaDataDrawer
    };

  },
});
</script>

<template>
  <v-card
    color="blue-grey darken-4"
    height="calc(100vh - 48px)"
    class="overflow-auto"
  >
    <v-tabs
      v-model="selectedTab"
      grow
      background-color="blue-grey darken-2 large-text"
      style="z-index: 2"
    >
      <!-- <v-tab
        href="#regions"
        @click="clearMetaDataDrawer()"
      >
        Regions
      </v-tab> -->
      <v-tab
        href="#search"
        @click="clearMetaDataDrawer()"
      >
        SEARCH
      </v-tab>
      <v-tab
        href="#results"
        @click="clearMetaDataDrawer()"
      >
        Imagery
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="selectedTab"
      color="blue-grey darken-4"
    >
      <v-tab-item
        value="regions"
      >
        <v-card flat>
          test1
          <!-- <Regions regions /> -->
        </v-card>
      </v-tab-item>
      <v-tab-item
        value="search"
      >
        test2
        <!-- <v-card
          flat
          color="blue-grey darken-4"
        >
          <v-form
            @submit.prevent="updateResults()"
          >
            <v-row justify="center">
              <v-col cols="11">
                <v-card-subtitle>Specify search area</v-card-subtitle>
                <GeoJsonForm />
                <v-card-subtitle>Apply search logic</v-card-subtitle>
                <Predicate />
                <v-card-subtitle>Acquired date range</v-card-subtitle>
                <DateRange />

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
        </v-card> -->
      </v-tab-item>
      <v-tab-item
        value="results"
      >
        <v-card
          flat
          color="blue-grey darken-4"
        >
          test3
          <!-- <Results /> -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
