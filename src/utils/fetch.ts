import { ITodo, ITodos } from "@interfaces/todos.interface";

export async function fetchTodos(id: number): Promise<ITodo>;
export async function fetchTodos(): Promise<ITodos>;
export async function fetchTodos(id?: number) {
  const params = id ? "?id=" + id : "";
  const result = await fetch("http://localhost:3000/api/todos" + params);
  return await result.json();
}

export async function addTodo(newData: Pick<ITodo, "title">) {
  const result = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(newData),
  });
  return await result.json();
}

export async function updateTodo(id: number, newData: Partial<ITodo>) {
  const result = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({ id, newData }),
  });
  return await result.json();
}

export async function removeTodo(id: number) {
  const result = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  return await result.json();
}
