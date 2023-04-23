<template>
  <header>
    <h1>
      <img :src="logo" alt="Logo" width="24" height="24" />
      {{ title }}
    </h1>
  </header>
</template>

<script setup lang="ts">
import logo from "~/assets/icons/check.svg"

const props = defineProps({
  title: String,
});
</script>
