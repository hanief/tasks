import { Task } from "~/types"
import { createTask, deleteTask, updateTask } from "~/composables/useBackend"

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([])

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks
  }

  function addLocalTask(text: string): Task {
    const localId = generateRandomInteger()
    const task: Task = {
      id: localId,
      localId: localId,
      text,
      isDone: false,
      user_id: 'demo_user',
    }
    tasks.value.push(task)

    return task
  }

  async function addTask(text: string): Promise<Task> {
    const localTask = addLocalTask(text)
    const { task: remoteTask } = await createTask(localTask)

    return updateWithRemoteTask(localTask, remoteTask)
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

  function toggleTask(task: Task) {
    task.isDone = !task.isDone
    updateLocalTask(task)
    updateTask(task)
  }

  function changeTaskText(task: Task) {
    updateLocalTask(task)
    updateTask(task)
  }

  function updateLocalTask(task: Task) {
    tasks.value = tasks.value.map(t => t.id === task.id ? task : t)
  }

  async function removeTask(task: Task) {
    removeLocalTask(task)
    await deleteTask(task)
  }

  function removeLocalTask(task: Task) {
    tasks.value = tasks.value.filter(t => t.localId !== task.localId)
  }

  return { tasks, setTasks, addTask, updateWithRemoteTask, removeTask, toggleTask, changeTaskText }
})
