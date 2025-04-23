export interface Todo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
}

export interface CreateTodoDto {
  title: string;
  description: string;
}

export interface PatchTodoDto {
  title?: string;
  description?: string;
}
