<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
const name = ref("");
</script>

<template>
  <input v-model="name" />
  <HelloWorld :msg="`Hello, ${name}!`"></HelloWorld>
</template>
