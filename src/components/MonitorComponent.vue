<template>
  <fwb-list-group :style="display">
    <fwb-list-group-item>{{ $store.state.current_markers_index }}</fwb-list-group-item>
    <fwb-list-group-item>{{ current_date }}</fwb-list-group-item>
  </fwb-list-group>
</template>

<script setup>
import { FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import store from "@/store.js";
</script>

<script>
export default {
    computed: {
        current_date: {
            get() {
                const date = new Date(store.state.current_timestamp * 1000);
                const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                return formattedDate;
            }
        },
        display: {
            get(){
                    return (0 == store.state.current_timestamp) ? "display: none" : "display: inline";
                }
            }
    }
};
</script>