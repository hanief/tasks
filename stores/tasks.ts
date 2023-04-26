import { Task } from "~/types"
import { createTask, deleteTask, updateTask } from "~/composables/useBackend"
import { useStorage } from '@vueuse/core'

export const useTasksStore = defineStore("tasks", () => {
  const { data: authData, status: authStatus } = useAuth()
  const user = useStorage('user', crypto.randomUUID())
  const storageTasks = useStorage<Task[]>("tasks", [])
  const tasks = ref<Task[]>(storageTasks.value)

  function mergeTasks(tasks: Task[], newTasks: Task[]) {
    const mergedTasks = tasks.map(task => {
      const newTask = newTasks.find(newTask => newTask.localId !== null && newTask.localId === task.localId)
      if (newTask) {
        return newTask
      }

      return task
    })

    return mergedTasks
  }

  function setTasks(newTasks: Task[]) {
    tasks.value = mergeTasks(tasks.value, newTasks)
    storageTasks.value = tasks.value
  }

  function addLocalTask(text: string): Task {
    const localId = generateRandomInteger()
    const task: Task = {
      id: localId,
      localId: localId,
      text,
      isDone: false,
      user: user.value || 'tasks@multita.sk'
    }
    tasks.value.push(task)
    storageTasks.value = tasks.value

    return task
  }

  async function addTask(text: string) {
    const localTask = addLocalTask(text)
    const { task: remoteTask } = await createTask(localTask)

    if (remoteTask !== null && remoteTask !== undefined) {
      updateWithRemoteTaskId(localTask, remoteTask)
    }
  }

  function updateWithRemoteTaskId(localTask: Task, remoteTask: Task) {
    tasks.value = tasks.value.map(task => {
      if (task.localId === localTask.localId) {
        return { ...task, id: remoteTask.id, localId: null }
      }

      return task
    })
    storageTasks.value = tasks.value
  }

  async function toggleTask(task: Task) {
    updateLocalTask(task)
    await updateTask(task)
  }

  async function changeTaskText(task: Task) {
    updateLocalTask(task)
    await updateTask(task)
  }

  function updateLocalTask(task: Task) {
    tasks.value = tasks.value.map(oldTask => oldTask.id === task.id ? task : oldTask)
    storageTasks.value = tasks.value
  }

  async function removeTask(task: Task) {
    removeLocalTask(task)
    await deleteTask(task)
  }

  function removeLocalTask(task: Task) {
    tasks.value = tasks.value.filter(t => t.localId !== task.localId)
    storageTasks.value = tasks.value
  }

  return { tasks, setTasks, addTask, updateWithRemoteTaskId, removeTask, toggleTask, changeTaskText }
})
