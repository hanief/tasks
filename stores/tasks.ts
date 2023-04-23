import { Task } from "~/types";
import { createTask } from "~/composables/useBackend";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
  }

  function addLocalTask(text: string): Task {
    const localId = generateRandomInteger()
    const task: Task = {
      id: localId,
      localId: localId,
      text,
      isDone: false,
    }
    tasks.value.push(task);

    return task
  }

  async function addTask(text: string): Promise<Task> {
    const localTask = addLocalTask(text)
    const { task: remoteTask } = await createTask(text);

    return updateWithRemoteTask(localTask, remoteTask);
  }

  function updateWithRemoteTask(localTask: Task, remoteTask: Task): Task {
    tasks.value = tasks.value.map(task => {
      if (task.localId === localTask.localId) {
        return { ...remoteTask, localId: task.localId }
      }

      return task
    })

    return remoteTask
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

  return { tasks, setTasks, addTask, updateWithRemoteTask, removeTask, toggleTask, changeTaskText };
});
