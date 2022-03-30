<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'BoundingBoxForm',

  setup() {
    const boundingBox = reactive({
      minLng: null,
      maxLng: null,
      minLat: null,
      maxLat: null,
    });

    return {
      boundingBox,
    };
  },
});

</script>

<template>
  <v-row
    no-gutters
    justify="center"
  >
    <v-col
      cols="11"
    >
      <v-btn
        color="teal accent-4"
        block
        x-large
        class="mt-3"
      >
        Use Map
      </v-btn>
    </v-col>
    <v-col
      cols="5"
      class="mr-3 mt-3"
    >
      <v-text-field
        v-model.number="boundingBox.minLng"
        label="Min Long(deg)"
        outlined
      />
    </v-col>
    <v-col
      cols="5"
      class="ml-3 mt-3"
    >
      <v-text-field
        v-model.number="boundingBox.maxLng"
        label="Max Long(deg)"
        outlined
      />
    </v-col>
    <v-col
      cols="5"
      class="mr-3"
    >
      <v-text-field
        v-model.number="boundingBox.minLat"
        label="Min Lat(deg)"
        outlined
      />
    </v-col>
    <v-col
      cols="5"
      class="ml-3"
    >
      <v-text-field
        v-model.number="boundingBox.maxLat"
        label="Max Lat(deg)"
        outlined
      />
    </v-col>
  </v-row>
</template>
