<template>
  <div id="datasheet"  class="container">
    <fwb-textarea
        v-model="$store.state.markers_list_str"
        :rows="20"
        label=""
        placeholder="Write your data..."
     />
  </div>
</template>

<script setup>
import { FwbTextarea } from 'flowbite-vue';
</script>

<script>
export default {
  name: 'DataSheet'
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>