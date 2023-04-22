<template>
  <li>
    <span>{{ task.text }}</span>
    <img class="success" v-if="task.isDone" src="~/assets/icons/check.svg"
      width="18" height="18" @click="emit('toggle', task.id)" />
    <img v-else src="~/assets/icons/circle.svg" width="18" height="18"
      @click="emit('toggle', task.id)" />
  </li>
</template>

<script setup lang="ts">

const { task } = defineProps<{
  task: Task;
}>();
const emit = defineEmits<{
  (event: "remove", id: number): void;
  (event: "toggle", id: number): void;
}>();
</script>

<style scoped>
li {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  border: 0.5px solid var(--color-bg-secondary);
  padding: 0.5rem 1rem;
}

li>a {
  text-decoration: none;
  cursor: pointer;
}

input {
  margin: 0;
}

img.success {
  color: var(--color-success);
}
</style>
