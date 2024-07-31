<template>
    <fwb-button @click="playback()" color="default" outline>Playback</fwb-button>
    <fwb-button @click="pause()" color="purple" outline>Pause</fwb-button>
    <fwb-button @click="stop()" color="red" outline>Stop</fwb-button>
    <fwb-button @click="reset()" color="dark" outline>Reset</fwb-button>
    <fwb-button @click="zoom_mod(1)" color="green" outline>zoom+</fwb-button>
    <fwb-button @click="zoom_mod(-1)" color="green" outline>zoom-</fwb-button>
    <fwb-button @click="speed(10)" color="yellow" outline>10X</fwb-button>
    <fwb-button @click="speed(20)" color="yellow" outline>20X</fwb-button>
    <fwb-button @click="speed(50)" color="yellow" outline>50X</fwb-button>
    <fwb-button @click="speed(100)" color="yellow" outline>100X</fwb-button>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue';
import store from "@/store.js";
import { INIT } from '@/values';

function playback(){
    store.state.play += 1;
    if ( store.state.play > 10 )  store.state.play = 0;
}

function pause(){
    store.state.pause = true;
}

function stop(){
    store.state.stop = true;
}

function zoom_mod(x){
    var zoom = store.state.zoom + x;
    if ( zoom < 1 )  store.state.zoom = 1;
    if ( zoom > 19 ) store.state.zoom = 19;
    if ( zoom <= 19 && zoom >= 1 ) store.state.zoom = zoom;
}

function speed(x){
    store.state.interval = 1000/x;
}

function reset(){
    store.state.zoom = INIT.zoom;
    store.state.interval = INIT.interval;
    store.state.selected = INIT.selected;
    store.state.markers_index = INIT.markers_index;
}

</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
#setting{
    display: flex
}
</style>