import { setActivePinia, createPinia } from "pinia"
import { describe, test } from "vitest"
import { setup } from "@nuxt/test-utils"
import { useTasksStore } from "stores/tasks"

describe("Tasks Store", () => {
  setup({});

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should load empty tasks", () => {
    const store = useTasksStore();
    expect(store.tasks).toHaveLength(0)
  });

  test("should return new tasks on setTasks", () => {
    const store = useTasksStore()
    const newTasks = [
      {
        id: 1,
        text: "Task 1",
        isDone: false,
      },
      {
        id: 2,
        text: "Task 2",
        isDone: false,
      },
    ]
    store.setTasks(newTasks);
    expect(store.tasks).toHaveLength(2);
    expect(store.tasks).toEqual(newTasks);
  })

  test("should be able to add new task", () => {
    const store = useTasksStore()
    expect(store.tasks).toHaveLength(0)

    const taskText = "Task 1"
    store.addTask(taskText)
    expect(store.tasks).toHaveLength(1)

    expect(store.tasks[0].text).toEqual(taskText)
    expect(store.tasks[0].isDone).toEqual(false)
  })

  test("should be able to toggle task done", () => {
    const store = useTasksStore()
    store.addTask("Task 1")
    expect(store.tasks).toHaveLength(1)

    const task = store.tasks[0]
    expect(task.isDone).toEqual(false)

    store.toggleTask(task.id)
    expect(task.isDone).toEqual(true)

    store.toggleTask(task.id)
    expect(task.isDone).toEqual(false)
  })

  test("should change task text", () => {
    const store = useTasksStore()

    const oldText = "Task 1"
    store.addTask(oldText)
    expect(store.tasks).toHaveLength(1)
    let task = store.tasks[0]
    expect(task.text).toEqual(oldText)

    const newText = "New Task 1"
    store.changeTaskText(task.id, newText)
    expect(task.text).toEqual(newText)
  })

  test("should remove task", () => {
    const store = useTasksStore()

    const taskText = "Task 1"
    store.addTask(taskText)
    expect(store.tasks).toHaveLength(1)

    const task = store.tasks[0]
    store.removeTask(task.id)
    expect(store.tasks).toHaveLength(0)
  })
});
