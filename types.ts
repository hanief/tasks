export interface Task {
  id?: number;
  localId?: number;
  text: string;
  isDone: boolean;
  user: string;
  authUser?: string;
}
