<template>
  <div class="container">
    <fwb-textarea
        v-model="$store.state.custom_hooks_str"
        :rows="10"
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
  name: 'CustomHooks'
}
</script>
