<template>
  <v-app>
    <h1>Error {{ error.statusCode || 500 }}</h1>
    <p v-if="error.message">{{ error.message }}</p>
  </v-app>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  layout: "empty",
  props: {
    error: {
      type: Object as PropType<Object>,
      default: null
    }
  }
});
</script>