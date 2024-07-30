<template>
  <div id="setting">
    <fwb-input
        v-model="$store.state.zoom"
        placeholder=""
        label="zoom"
    />
    <fwb-input
        v-model="$store.state.interval"
        placeholder=""
        label="interval"
    />
    <fwb-input
        v-model="$store.state.selected"
        placeholder=""
        label="selected"
    />
    <fwb-input
        v-model="$store.state.markers_index"
        placeholder=""
        label="markers_index"
    />
    <fwb-textarea
        v-model="$store.state.markers_list_str"
        :rows="2"
        label=""
        placeholder="Write your data..."
    />
  </div>
</template>


<script setup>
import { FwbInput, FwbTextarea } from 'flowbite-vue';
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
#setting{
    display: flex
}
</style>