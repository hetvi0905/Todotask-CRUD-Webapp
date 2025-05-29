import { axiosInstance } from "./axiosInstance";
import { Todo } from "@/types/todo";
// Temporary interface for backend response format
interface RawTodo {
  _id: string;
  title: string;
  completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const res = await axiosInstance.get<RawTodo[]>("/");
    console.log("Fetched todos:", res.data);

    return res.data.map((todo: RawTodo) => ({
      id: todo._id,
      title: todo.title,
      completed: todo.completed,
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch todos:", error.message);
      throw error;
    }
    // fallback in case error is not an instance of Error
    throw new Error("Failed to fetch todos: Unknown error");
  }
}

export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const res = await axiosInstance.post<Todo>("/", todo);
  return res.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await axiosInstance.put<Todo>(`/${todo.id}`, todo);
  return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
