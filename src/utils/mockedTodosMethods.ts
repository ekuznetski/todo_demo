import { ITodo, ITodos } from "@interfaces/todos.interface";
import * as fs from "fs";
import mockedTodosData from "./mockedTodosData.json";

async function get(id: number): Promise<ITodo>;
async function get(): Promise<ITodos>;
async function get(id?: number) {
  if (id) return mockedTodosData.find((e) => e.id === id);
  return mockedTodosData;
}
async function add(newTodoData: Pick<ITodo, "title">): Promise<ITodo> {
  console.log(newTodoData);
  const newTodo = newTodoData as ITodo;
  const lastId = Object.values(mockedTodosData).length - 1;
  newTodo.id = Object.values(mockedTodosData)[lastId].id + 1;
  newTodo.completed = false;
  mockedTodosData.push(newTodo);
  writeToFile(mockedTodosData);
  return newTodo;
}

async function update(todoId: number, newData: Partial<ITodo>): Promise<ITodo> {
  const updatedTodo = Object.assign(await get(todoId), newData);
  Object.assign(mockedTodosData, updatedTodo);
  writeToFile(mockedTodosData);
  return updatedTodo;
}

async function remove(id: number): Promise<boolean> {
  const newMockedTodosData = mockedTodosData.filter((e) => e.id !== id);
  writeToFile(newMockedTodosData);
  return true;
}

function writeToFile(newData: any) {
  try {
    fs.writeFileSync(
      "./src/utils/mockedTodosData.json",
      JSON.stringify(newData)
    );
  } catch (err) {
    console.error(err);
  }
}

const mockedTodosMethods = {
  get,
  add,
  update,
  remove,
};
export default mockedTodosMethods;
