<template>
  <ul>
    <TransitionGroup name="list">
      <TaskItem v-for="task in displayedTasks" :task="task" :key="task.id"
        :showActions="showActions" @remove="removeTask" @toggle="toggleTask"
        @update="handleUpdate">
      </TaskItem>
    </TransitionGroup>
    <TaskItemNew @add="handleAdd" />
  </ul>
  <div class="toolbar">
    <a @click="toggleCompleted">{{ showCompleted ? 'Hide' : 'Show' }}
      Completed</a>
    <a @click="toggleActions">Edit</a>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTasksStore } from "~/stores/tasks";

const store = useTasksStore();
const { tasks } = storeToRefs(store);
const { toggleTask, removeTask, addTask, setTasks } = store;
const showCompleted = ref(false);
const showActions = ref(false);

const displayedTasks = computed(() => {
  const filteredTasks = showCompleted.value ? tasks.value : tasks.value.filter(t => !t.isDone)

  return filteredTasks.sort((a, b) => Number(a.isDone) - Number(b.isDone));
});
const toggleCompleted = () => showCompleted.value = !showCompleted.value;
const toggleActions = () => showActions.value = !showActions.value;

function handleUpdate(payload: any) {
  console.log(payload)
}

async function handleAdd(payload: any) {
  await addTask(payload)
}

onMounted(async () => {
  const { tasks: newTasks } = await fetchTasks();
  setTasks(newTasks)
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
  margin: 1rem 1rem;
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
