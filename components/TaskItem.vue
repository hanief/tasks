<template>
  <li aria-label="task-item" :class="{ editing: isEditing }">
    <input ref="inputRef" id="task-item-input" aria-label="task-item-input"
      :value="taskText" @change="handleChange" @focus="handleFocus"
      @blur="handleBlur" @keydown.enter.prevent=""
      @keyup.enter="handleEnterPress" />
    <button aria-label="toggle-button" v-show="!showActions"
      @click="handleToggle">
      <img :class="{ success: task.isDone }"
        :src="task.isDone ? checkIcon : circleIcon" alt="toggle complete"
        width="18" height="18" />
    </button>
    <button aria-label="delete-button" v-show="showActions" @click="handleRemove">
      <img class="danger" :src="trashIcon" alt="delete button" width="18"
        height="18" />
    </button>
  </li>
</template>

<script setup lang="ts">
import { Task } from "~/types"
import checkIcon from '~/assets/icons/check.svg'
import circleIcon from '~/assets/icons/circle.svg'
import trashIcon from '~/assets/icons/trash.svg'
const { task } = defineProps<{
  showActions: boolean;
  task: Task;
}>();
const emit = defineEmits<{
  (event: "remove", task: Task): void;
  (event: "toggle", task: Task): void;
  (event: "update", task: Task): void;
}>();
const isEditing = ref(false);
const inputRef = ref();
const taskText = ref(task.text);

function handleToggle() {
  emit("toggle", { ...task, isDone: !task.isDone });
}

function handleRemove() {
  emit("remove", task);
}

function handleFocus() {
  isEditing.value = true;
}

function handleBlur() {
  task.text = taskText.value;
  emit("update", task);
  isEditing.value = false;
}

function handleEnterPress(event: Event) {
  inputRef.value.blur();
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  taskText.value = target?.value;
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

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 28px;
  height: 28px;
  margin: 0;
  ;
}

img.success {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(80%) contrast(119%)
}

img.danger {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(0deg) brightness(80%) contrast(119%)
}

.icon-enter-active,
.icon-leave-active {
  transition: all 0.5s;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>
