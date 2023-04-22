<template>
  <li :class="{ editing: isEditing }">
    <input v-model="task.text" @focus="editingOn" @blur="editingOff" />
    <img class="success" v-show="task.isDone" src="~/assets/icons/check.svg"
      width="18" height="18" @click="emit('toggle', task.id)" />
    <img v-show="!task.isDone" src="~/assets/icons/circle.svg" width="18"
      height="18" @click="emit('toggle', task.id)" />
  </li>
</template>

<script setup lang="ts">

const { task } = defineProps<{
  task: Task;
}>();
const emit = defineEmits<{
  (event: "remove", id: number): void;
  (event: "toggle", id: number): void;
  (event: "update", id: number, text: string): void;
}>();
const isEditing = ref(false);

function editingOn() {
  isEditing.value = true;
}

function editingOff() {
  isEditing.value = false;
}

function handleChange(event: Event) {
  const target = event.target as HTMLSpanElement;
  console.log(target.innerText)
  // task.text = target?.innerText || "";
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

li.editing {
  border: 0.75px solid var(--color-link);
}

li>span {
  cursor: text;
  margin-right: 1rem;
  flex-grow: 2;
}

li>input {
  width: 100%;
  cursor: text;
  margin-right: 1rem;
  margin-bottom: 0;
  border: 0;
  padding: 0.3rem 0;
}

li>input:focus {
  outline: none !important;
  border: 0
}

li>a {
  text-decoration: none;
  cursor: pointer;
}

img.success {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(80%) contrast(119%)
}
</style>
