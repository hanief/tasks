<template>
  <li>
    <input v-model="newTaskText" type="text" @keyup.enter="handleAddTask"
      placeholder="Add new task" />
  </li>
</template>

<script setup lang="ts">
const newTaskText = useState(() => "");
const emit = defineEmits<{
  (event: "add", text: string): void;
}>();

function handleAddTask() {
  if (newTaskText.value === "") return;

  emit("add", newTaskText.value);
  newTaskText.value = "";
}
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
  width: 100%;
  border: 0;
  padding: 0.3rem 0;
  margin: 0;
}

input:focus {
  border: 0;
}
</style>
