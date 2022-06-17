<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { resultsFilter } from '@/store/results';

export default defineComponent({
  name: 'DateRange',
  components: { Datepicker },

  setup() {
    // const startDate = ref('');
    // const startTime = ref('');
    // const endDate = ref('');
    // const endTime = ref('');

    const start = ref(new Date());
    const end = ref((new Date()));


    const format = (date:Date) => {
      const formattedDate = date.toISOString().slice(1,16);

      // const time = date.get();

      return `${formattedDate}`;
    };



    // const updateInput = () => {
    //   if (start.value) {
    //     resultsFilter.value.acquired.start = `${start.value}T${start.value}`;
    //   }
    //   if (end.value) {
    //     resultsFilter.value.acquired.end = `${end.value}T${end.value}`;
    //   }
    // };

    return {
      resultsFilter,
      // updateInput,
      start,
      end,
      format,
    };
  },
});

</script>

<template>
  <v-row
    no-gutters
    justify="space-evenly"
  >
    <v-col
      cols="6"
      class="pr-3"
    >
      <Datepicker
        v-model="resultsFilter.acquired.start"
        dark
        :format="format"
      />
    </v-col>
    <v-icon>mdi-minus</v-icon>
    <v-col
      cols="5"
    >
      <Datepicker
        v-model="end"
        dark
        :format="format"
      />
    </v-col>
  </v-row>
</template>

  <!-- Potentially add back when vuetify 3 is available. As of 6/17 the vuepic date/time picker is significantly better though -->
  <!-- <v-row
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
</template> -->
