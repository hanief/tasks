export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
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

  function updateTask(task: Task) {
    tasks.value = tasks.value.map(t => t.id === task.id ? task : t)
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  return { tasks, setTasks, addTask, removeTask, toggleTask, changeTaskText };
});
