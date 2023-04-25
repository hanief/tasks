<template>
  <NuxtLayout>
    <main>
      <section>
        <NuxtPage />
      </section>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const user = useStorage('user', crypto.randomUUID())
</script>