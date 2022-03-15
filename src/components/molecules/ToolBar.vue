<template>
  <div>
    <v-toolbar
      v-if="text"
      v-bind="$attrs"
    >
      {{ text }}
    </v-toolbar>
    <v-toolbar
      v-else
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
  name: 'ToolBar',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default:'test'
    },
  },
});

</script>
