<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  drawnShape, specifiedShape, geometryInputSelection,
} from '@/store/search';
import { useMap } from '@/store/search';

export default defineComponent({
  name: 'GeoJsonForm',

  setup() {

    const geoOptions = [
      'Draw on Map',
      'Copy/Paste GeoJson',
      'Upload File',
    ];
    const geoJsonString = ref('');
    const geoJsonErrorMessages = ref(['']);

    const clearShape = () => {
      drawnShape.value = {
        type: 'Polygon',
        coordinates: [],
      };
      geoJsonErrorMessages.value = [];
    };
    const selectShape = (value: Event) => {
      clearShape();
      geometryInputSelection.value = value;
    };

    const isGeoJSON = (inputText: string) => {
      try {
        JSON.parse(inputText);
        geoJsonErrorMessages.value = [];
      } catch (e) {
        geoJsonErrorMessages.value = ['Not a valid GeoJSON Polygon or MultiPolygon'];
      }
      return true;
    };
    const confirmGeoJSON = () => {
      const jsonForm = JSON.parse(geoJsonString.value);
      if (jsonForm.geometry) {
        specifiedShape.value = jsonForm.geometry;
      } else {
        specifiedShape.value = jsonForm;
      }
    };
    const validateFile = (file: File) => {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readEvent) => {
        if (readEvent.target) {
          const { result } = readEvent.target;
          if (result && typeof result === 'string') {
            isGeoJSON(result);
            if (geoJsonErrorMessages.value.length === 0) {
              geoJsonString.value = result;
              confirmGeoJSON();
            }
          }
        }
      };
      reader.onerror = () => {
        geoJsonErrorMessages.value = ['Error reading file.'];
      };
      return true;
    };

    return {
      useMap,
      clearShape,
      selectShape,
      drawnShape,
      specifiedShape,
      geometryInputSelection,
      geoOptions,
      geoJsonString,
      geoJsonErrorMessages,
      isGeoJSON,
      validateFile,
      confirmGeoJSON,
    };
  },
});

</script>

<template>
  <div>
    <v-select
      v-model="geometryInputSelection"
      :items="geoOptions"
      label="Search area"
      messages="Select a method of specifying a geographical area."
      :hide-details="geometryInputSelection !== undefined"
      outlined
      clearable
      dense
      @click:clear="clearShape"
      @change="selectShape"
    />
    <v-btn
      v-if="geometryInputSelection === geoOptions[0] && !useMap"
      color="#188DC8"
      block
      class="mt-3"
      @click="useMap = true"
    >
      Draw polygon on map
    </v-btn>
    <div v-if="geometryInputSelection === geoOptions[0] && useMap">
      Click on the map to draw points of a polygon.
      Double click to complete the polygon selection.
    </div>
    <div
      v-if="geometryInputSelection === geoOptions[1]"
    >
      Paste GeoJSON contents below.
      <v-spacer />
      <v-textarea
        v-model="geoJsonString"
        autofocus
        clearable
        :rules="[isGeoJSON]"
        :messages="geoJsonErrorMessages"
      />
      <v-btn
        v-if="geoJsonErrorMessages.length === 0"
        color="#188DC8"
        block
        class="mt-3"
        @click="confirmGeoJSON"
      >
        Confirm GeoJSON search area
      </v-btn>
    </div>
    <div v-if="geometryInputSelection === geoOptions[2]">
      <v-file-input
        accept=".json,.txt"
        autofocus
        chips
        clearable
        dense
        full-width
        hint="Provide GeoJSON file"
        persistent-hint
        :rules="[validateFile]"
        :messages="geoJsonErrorMessages"
      />
    </div>
    <v-text-field
      v-if="drawnShape.coordinates.length > 0"
      readonly
      label="Copy search area specification"
      :value="JSON.stringify(drawnShape)"
    />
  </div>
</template>
