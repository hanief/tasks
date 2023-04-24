<template>
  <header>
    <h1>
      {{ title }}
    </h1>
    <a role="button" v-if="status === 'unauthenticated'"
      @click="signIn('auth0')">Login</a>
    <a v-else-if="status === 'authenticated'" @click="signOut()">Logout</a>
    <a v-else-if="status === 'loading'">Logging in...</a>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '#imports'

const props = defineProps({
  title: String,
});

const { status, signIn, signOut } = useAuth()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 1rem;
}

a {
  text-decoration: none;
  cursor: pointer;
  margin: 1rem;
}
</style>
