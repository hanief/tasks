<template>
  <li :class="{ editing: isEditing }">
    <input aria-label="task-item-input" v-model="task.text" @focus="handleFocus"
      @blur="handleBlur" />
    <img :class="{ success: task.isDone }" v-show="!showActions"
      :src="task.isDone ? checkIcon : circleIcon" alt="toggle complete" width="18"
      height="18" @click="emit('toggle', task.id)" />
  </li>
</template>

<script setup lang="ts">
import { Task } from "~/types"
import checkIcon from '~/assets/icons/check.svg'
import circleIcon from '~/assets/icons/circle.svg'
const { task } = defineProps<{
  showActions: boolean;
  task: Task;
}>();
const emit = defineEmits<{
  (event: "remove", id: number): void;
  (event: "toggle", id: number): void;
  (event: "update", id: number, text: string): void;
}>();
const isEditing = ref(false);

function handleFocus() {
  isEditing.value = true;
}

function handleBlur() {
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
  border: 0.75px solid var(--color-primary);
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
