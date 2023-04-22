export function useBackend() {
  async function fetchTasks() {
    const { data } = await useMyFetch<Task[]>("/tasks");

    return {
      tasks: data.value || [],
    }
  }

  async function createTask(text: string) {
    const { data } = await useMyFetch("/tasks", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    return {
      task: data.value,
    }
  }

  async function updateTask(task: Task) {
    const { data } = await useMyFetch(`/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });

    return {
      task: data.value,
    }
  }


  async function deleteTask(task: Task) {
    const { data } = await useMyFetch(`/tasks/${task.id}`, {
      method: "DELETE",
    });

    return {
      task: data.value,
    }
  }

  return { fetchTasks, createTask, updateTask, deleteTask }
}