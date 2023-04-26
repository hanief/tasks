export interface Task {
  id?: number;
  localId?: number | null;
  text: string;
  isDone: boolean;
  user: string;
  authUser?: string;
}
