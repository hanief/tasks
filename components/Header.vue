<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
