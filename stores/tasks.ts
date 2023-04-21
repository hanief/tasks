import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  async function getRemoteTasks() {
    const { data } = await useMyFetch<Task[]>("/tasks");
    setTasks(data.value ?? []);
  }

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
  }

  async function createRemoteTask(text: string) {
    const { data } = await useMyFetch("/tasks", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    if (data.value) {
      await getRemoteTasks();
    }
  }

  function addTask(text: string) {
    tasks.value.push({
      id: generateRandomInteger(),
      text,
      isDone: false,
    });
  }

  function toggleTask(id: number) {
    const task = tasks.value.find(task => task.id === id);
    if (task) {
      task.isDone = !task.isDone;
      updateTask(task);
    }
  }

  function changeTaskText(id: number, text: string) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.text = text;
      updateTask(task);
    }
  }

  async function updateRemoteTask(task: Task) {
    const { data } = await useMyFetch(`/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });

    if (data.value) {
      updateTask(data.value as Task);
    }
  }

  function updateTask(task: Task) {
    tasks.value = tasks.value.map(t => t.id === task.id ? task : t)
  }

  async function deleteRemoteTask(task: Task) {
    const { data } = await useMyFetch(`/tasks/${task.id}`, {
      method: "DELETE",
    });
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  onMounted(() => {
    getRemoteTasks();
  });

  return { tasks, setTasks, addTask, removeTask, toggleTask, changeTaskText };
});
