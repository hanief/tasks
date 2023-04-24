import { Task } from "~/types";

export async function fetchTasks() {
  const { status: authStatus, data: authData } = useAuth()
  const { data } = await useMyFetch<Task[]>("/tasks");

  return {
    tasks: data.value ? data.value.map(task => {
      task.localId = task.id;
      return task;
    }) : [],
  }
}

export async function createTask(task: Task): Promise<{ task: Task }> {
  const { text, isDone, localId } = task
  const { status: authStatus, data: authData } = useAuth()
  const { data } = await useMyFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({
      text,
      isDone,
      localId,
      user_id: authStatus.value === 'authenticated' ? authData.value?.user_id : 'demo_user'
    }),
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