import { getDatasource } from "@api/datasources";
import { TodoResponseDto } from "@api/dtos/todo";
import type { CreateTodoDto, PatchTodoDto } from "@api/dtos/todo";
import { Todo } from "@api/entities/todo";
import { NotFoundError } from "@api/errors/not-found";

const todoRepository = getDatasource().getRepository(Todo);

class TodoService {
  async list(userId: number) {
    const todos = await this.getTodos(userId);
    return todos.map((todo) => TodoResponseDto.fromEntity(todo));
  }

  async get(userId: number, todoId: number) {
    const todo = await this.getTodoOrThrow(userId, todoId);
    return TodoResponseDto.fromEntity(todo);
  }

  async create(userId: number, todo: CreateTodoDto) {
    return todoRepository.save({
      ...todo.toEntity(),
      user: { id: userId },
    });
  }

  async patch(userId: number, todoId: number, todo: PatchTodoDto) {
    const existingTodo = await this.getTodoOrThrow(userId, todoId);
    return todoRepository.save(existingTodo.patch(todo));
  }

  async delete(userId: number, todoId: number) {
    const existingTodo = await this.getTodoOrThrow(userId, todoId);
    return todoRepository.remove(existingTodo);
  }

  async toggleDone(userId: number, todoId: number) {
    const todo = await this.getTodoOrThrow(userId, todoId);
    return todoRepository.save({
      ...todo,
      isDone: !todo.isDone,
    });
  }

  private async getTodo(userId: number, todoId: number) {
    const todo = await todoRepository.findOne({
      where: {
        id: todoId,
        user: {
          id: userId,
        },
      },
    });

    return todo;
  }

  private async getTodos(userId: number) {
    const todos = await todoRepository.find({
      where: {
        user: { id: userId },
      },
    });

    return todos;
  }

  private async getTodoOrThrow(userId: number, todoId: number): Promise<Todo> {
    const todo = await this.getTodo(userId, todoId);
    if (!todo) {
      throw new NotFoundError(
        `Todo not found for user: ${userId} and todoId: ${todoId}`
      );
    }
    return todo;
  }
}

const todoService = new TodoService();
export default todoService;
