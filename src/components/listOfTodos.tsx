import { EQueryKeys } from "@enums/queryKeys.enum";
import { ITodo, ITodos } from "@interfaces/todos.interface";
import s from "@styles/todo.module.scss";
import { removeTodo, updateTodo } from "@utils/fetch";
import Link from "next/link";
import { SyntheticEvent } from "react";
import { useQuery, useQueryClient } from "react-query";

export function ListOfTodos() {
  const { data } = useQuery<ITodos>(EQueryKeys.todos);
  const queryClient = useQueryClient();
  const removeHandler = (event: SyntheticEvent, id: number) => {
    event.stopPropagation();
    removeTodo(id).then((e) => {
      if (data) {
        const newData = data.filter((e) => e.id !== id);
        queryClient.setQueryData(EQueryKeys.todos, newData);
      }
    });
  };

  const markCompleteHandler = (event: SyntheticEvent, todo: ITodo) => {
    event.stopPropagation();
    const newData = { completed: !todo.completed };
    updateTodo(todo.id, newData).then((e) => {
      if (data) {
        const originalTodo = data.find((e) => e.id === todo.id);
        Object.assign(originalTodo, newData);
        queryClient.setQueryData(EQueryKeys.todos, (data) => {
          return Object.assign(data, originalTodo);
        });
      }
    });
  };

  return data ? (
    <ul className={s.todoList}>
      {data.map((e) => (
        <li
          key={e.id}
          className={`${s.todoLink} ${e.completed ? s.completed : ""}`}>
          <Link href={`/${e.id}`}>
            <div className={s.todoWrapper}>
              <input
                type="checkbox"
                checked={e.completed}
                className={s.markComplete}
                // about optimisation - in JS we should write as less as possible handlers and   better to write one handler for <ul> element, but in react synthetic event handle all listeners on top level and doesn't matter how many we will add
                onClick={(event) => markCompleteHandler(event, e)}
              />
              <div className={s.todoTitle}>
                {e.id}. {e.title}
              </div>
              <div
                className={s.removeTodo}
                onClick={(event) => removeHandler(event, e.id)}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
}
