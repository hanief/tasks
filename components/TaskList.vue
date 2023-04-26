<template>
  <ul>
    <TransitionGroup name="list">
      <TaskItem v-for="task in displayedTasks" :task="task" :key="task.localId"
        :showActions="showActions" @remove="removeTask" @toggle="toggleTask"
        @update="changeTaskText">
      </TaskItem>
    </TransitionGroup>
    <TaskItemNew @add="addTask" />
  </ul>
  <div class="toolbar">
    <a role="button" aria-label="toggle-completed-button"
      @click="toggleCompleted">{{ showCompleted ? 'Hide' : 'Show' }}
      Completed</a>
    <a role="button" aria-label="edit-button" @click="toggleActions">{{
      showActions ? 'Done' : 'Edit' }}</a>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTasksStore } from "~/stores/tasks";

const store = useTasksStore();
const { tasks } = storeToRefs(store);
const { toggleTask, removeTask, addTask, setTasks, changeTaskText } = store;
const showCompleted = ref(false);
const showActions = ref(false);

const toggleCompleted = () => showCompleted.value = !showCompleted.value;
const toggleActions = () => showActions.value = !showActions.value;
const displayedTasks = computed(() => tasks.value.filter(t => showCompleted.value || !t.isDone).sort((a, b) => Number(a.isDone) - Number(b.isDone)));

onMounted(async () => {
  const { tasks: newTasks } = await fetchTasks();
  if (newTasks.length > 0) {
    setTasks(newTasks)
  }
});
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 1px solid var(--color-bg-secondary);
  border-radius: 8px;
  width: 100%;
  margin: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

a {
  margin: 1rem;
  text-decoration: none;
  cursor: pointer;
}

div.toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
