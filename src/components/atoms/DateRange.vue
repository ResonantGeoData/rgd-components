<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';

import { resultsFilter } from '@/store/results';

export default defineComponent({
  name: 'DateRange',
  
  setup() {
    const startDate = ref('');
    const startTime = ref('');
    const endDate = ref('');
    const endTime = ref('');

    const updateInput = () => {
      if (startDate.value) {
        resultsFilter.value.acquired.startDate = `${startDate.value}T${startTime.value}`;
      }
      if (endDate.value) {
        resultsFilter.value.acquired.endDate = `${endDate.value}T${endTime.value}`;
      }
    };

    return {
      resultsFilter,
      startTime,
      startDate,
      endTime,
      endDate,
      updateInput,
    };
  },
});

</script>

<template>
  <v-row
    no-gutters
    justify="center"
  >
    <v-dialog
      v-model="resultsFilter.acquired.startDateModal"
      width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-col
          cols="6"
          class="pr-3"
        >
          <v-text-field
            v-model:propName="resultsFilter.acquired.startDate"
            prepend-icon="mdi-calendar"
            append-outer-icon="mdi-minus"
            clearable
            readonly
            dense
            v-bind="attrs"
            v-on="on"
            @click:clear="resultsFilter.acquired.startDate = null"
          />
        </v-col>
      </template>
      <div class="d-flex justify-space-between blue-grey darken-4">
        <v-date-picker
          v-model="startDate"
          scrollable
        />
        <v-time-picker
          v-model="startTime"
        />
      </div>
      <div class="d-flex justify-space-between blue-grey darken-4">
        <v-btn
          text
          color="primary"
          @click="resultsFilter.acquired.startDateModal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="resultsFilter.acquired.startDateModal = false, updateInput()"
        >
          OK
        </v-btn>
      </div>
    </v-dialog>
    <v-dialog
      v-model="resultsFilter.acquired.endDateModal"
      width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-col
          cols="5"
        >
          <v-text-field
            v-model:propName="resultsFilter.acquired.endDate"
            prepend-icon="mdi-calendar"
            clearable
            readonly
            dense
            v-bind="attrs"
            v-on="on"
            @click:clear="resultsFilter.acquired.endDate = null"
          />
        </v-col>
      </template>
      <div class="d-flex justify-space-between blue-grey darken-4">
        <v-date-picker
          v-model="endDate"
          scrollable
        />
        <v-time-picker
          v-model="endTime"
        />
      </div>
      <div class="d-flex justify-space-between blue-grey darken-4">
        <v-btn
          text
          color="primary"
          @click="resultsFilter.acquired.endDateModal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="resultsFilter.acquired.endDateModal = false, updateInput()"
        >
          OK
        </v-btn>
      </div>
    </v-dialog>
  </v-row>
</template>
