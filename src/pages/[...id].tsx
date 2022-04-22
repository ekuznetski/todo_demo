import { EQueryKeys } from "@enums/queryKeys.enum";
import { ITodos } from "@interfaces/todos.interface";
import queryClient from "@state/queryClient";
import s from "@styles/todo.module.scss";
import { fetchTodos, updateTodo } from "@utils/fetch";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { dehydrate, useQuery } from "react-query";

const Todo = () => {
  const router = useRouter();
  const { data } = useQuery<ITodos>(EQueryKeys.todos);
  const todo = data?.find((e) => e.id === Number(router.asPath.slice(1)));
  const [newTitle, setNewTitle] = useState(todo?.title ?? "");
  const updateTodoHandler = () => {
    if (todo) {
      const newData = {
        title: newTitle,
      };
      updateTodo(todo.id, newData).then((e) => {
        if (data) {
          const originalTodo = data.find((e) => e.id === todo.id);
          Object.assign(originalTodo, newData);
          queryClient.setQueryData(EQueryKeys.todos, (data) => {
            return Object.assign(data, originalTodo);
          });
        }
      });
    }
  };
  const backHandler = () => {
    router.push("/");
  };
  return todo ? (
    <>
      <h1>Edit TODO</h1>
      <div className={s.updateTodoTitle}>
        <div className={s.todoTitle}>
          {todo.id}
          <input
            className={s.updateTodoTitleInput}
            value={newTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
          />
        </div>
        <div className={s.buttons}>
          <button onClick={backHandler}>back</button>
          <button
            onClick={updateTodoHandler}
            disabled={todo.title === newTitle}>
            save
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default Todo;

export async function getServerSideProps(
  props: NextPageContext & GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  if (!queryClient.getQueryData(EQueryKeys.todos)) {
    await queryClient.prefetchQuery(EQueryKeys.todos, fetchTodos);
  }

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
