<template>
<div style="display: flex;" class="margin_bottom20px">
  <div class="margin_right20px">
    <DataSheet />
    <MonitorComponent />
  </div>
  <MapComponent />
</div>
<div style="display: flex">
  <SettingComponent />
  <ButtonComponent />
</div>
</template>

<script>
import MapComponent from './components/MapComponent.vue';
import DataSheet from './components/DataSheet.vue';
import SettingComponent from './components/SettingComponent.vue';
import ButtonComponent from './components/ButtonComponent.vue';
import MonitorComponent from './components/MonitorComponent.vue';

export default {
  name: 'App',
  components: {
    MapComponent,
    DataSheet,
    SettingComponent,
    ButtonComponent,
    MonitorComponent
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.margin_bottom20px {margin-bottom: 20px}
.margin_right5px{margin-right: 5px}
.margin_right20px{margin-right: 20px}
.margin5px {margin: 5px}
</style>
