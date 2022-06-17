<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { resultsFilter } from '@/store/results';

export default defineComponent({
  name: 'TimeRange',
  components: { Datepicker },

  setup() {
    const startTime = ref();
    const endTime = ref();
    return {
      resultsFilter,
      startTime,
      endTime,
    };
  },
});

</script>
<template>
  <v-row>
    <v-col
      cols="6"
    >
      <Datepicker
        v-model="startTime"
        time-picker
        dark
      >
        <template #input-icon>
          <v-icon
            icon="mdi-clock-time-four-outline"
          />
        </template>
      </Datepicker>
    </v-col>
    <v-col
      cols="6"
    >
      <Datepicker
        v-model="endTime"
        time-picker
        dark
      >
        <template #input-icon>
          <v-icon
            icon="mdi-clock-time-four-outline"
          />
        </template>
      </Datepicker>
    </v-col>
  </v-row>
</template>

<!-- <template>
  <div>
    <div>
      Time Range
    </div>
    <v-row>
      <v-dialog
        v-model="resultsFilter.time.startTimeModal"
        width="290px"
      >
        <template #activator="{ on, attrs }">
          <v-col
            cols="6"
          >
            <v-text-field
              v-model:propName="resultsFilter.time.startTime"
              prepend-icon="mdi-clock-time-four-outline"
              clearable
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            />
          </v-col>
        </template>
        <v-time-picker
          v-if="resultsFilter.time.startTimeModal"
          v-model="resultsFilter.time.startTime"
          ampm-in-title
          format="ampm"
          full-width
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="resultsFilter.time.startTimeModal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="resultsFilter.time.startTimeModal = false, $emit('input', resultsFilter)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
      <v-dialog
        v-model="resultsFilter.time.endTimeModal"
        width="290px"
      >
        <template #activator="{ on, attrs }">
          <v-col
            cols="6"
          >
            <v-text-field
              v-model:propName="resultsFilter.time.endTime"
              prepend-icon="mdi-clock-time-four-outline"
              clearable
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            />
          </v-col>
        </template>
        <v-time-picker
          v-if="resultsFilter.time.endTimeModal"
          v-model="resultsFilter.time.endTime"
          ampm-in-title
          format="ampm"
          full-width
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="resultsFilter.time.endTimeModal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="resultsFilter.time.endTimeModal = false, $emit('input', resultsFilter)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-row>
  </div>
</template> -->
