<template>
  <header>
    <NuxtLink to="/" class="logo">
      <h1>Multitask</h1>
    </NuxtLink>
    <div v-if="isDev">
      <a class="button" v-if="status === 'unauthenticated'"
        @click="signIn('google')">Login</a>
      <a class="button" v-if="status === 'authenticated'"
        @click="signOut()">Logout</a>
    </div>
  </header>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth()
const isDev = ref(process.env.NODE_ENV === 'development')

</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a.button {
  color: var(--color-primary);
}

a.logo {
  color: var(--color-text);
}

a {
  text-decoration: none;
  cursor: pointer;
  margin: 0 1rem;
}
</style>
