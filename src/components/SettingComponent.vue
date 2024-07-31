<template>
  <div id="setting">
    <fwb-input
        class="margin_right5px"
        v-model="$store.state.zoom"
        placeholder=""
        label="zoom"
    />
    <fwb-input
        class="margin_right5px"
        v-model="$store.state.interval"
        placeholder=""
        label="interval"
    />
    <fwb-input
        class="margin_right5px"
        v-model="$store.state.selected"
        placeholder=""
        label="selected"
    />
    <fwb-input
        class="margin_right5px"
        v-model="$store.state.markers_index"
        placeholder=""
        label="markers_index"
    />
  </div>
</template>


<script setup>
import { FwbInput } from 'flowbite-vue';
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
#setting{
    display: flex;
    margin-left: 10px;
    margin-right: 20px;
}
.margin_right5px{margin-right: 5px}
</style>