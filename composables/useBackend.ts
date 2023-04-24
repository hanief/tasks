import { Task } from "~/types";

export async function fetchTasks() {
  const { data: authData } = useAuth()
  const { data } = await useMyFetch<Task[]>("/tasks", { params: { userId: authData.value?.user?.email } });

  return {
    tasks: data.value ? data.value.map(task => {
      task.localId = task.id;
      return task;
    }) : [],
  }
}

export async function createTask(text: string): Promise<{ task: Task }> {
  const { data } = await useMyFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ text, isDone: false }),
  });

  return {
    task: data.value as Task,
  }
}

export async function updateTask(task: Task) {
  const { data } = await useMyFetch(`/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

  return {
    task: data.value,
  }
}


export async function deleteTask(task: Task) {
  const { data } = await useMyFetch(`/tasks/${task.id}`, {
    method: "DELETE",
  });

  return {
    task: data.value,
  }
}