import { EQueryKeys } from "@enums/queryKeys.enum";
import queryClient from "@state/queryClient";
import s from "@styles/todo.module.scss";
import { addTodo } from "@utils/fetch";
import { useRef, useState } from "react";

export function AddNewTodo(): JSX.Element {
  // i prefer useRef because in simple cases it helps to avoid unnecessary rerenders
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorIsActive, setErrorActive] = useState<boolean>(false);
  const submitHandler = async () => {
    const title = inputRef?.current?.value;
    if (title) {
      setErrorActive(false);
      addTodo({ title }).then((newTodo) => {
        queryClient.setQueryData(EQueryKeys.todos, (todos) =>
          Object.assign(todos, { [newTodo.id]: newTodo })
        );
      });
      if (inputRef?.current?.value) inputRef.current.value = "";
    } else {
      setErrorActive(true);
    }
    // in general we have 3 options after request:
    // 1) refetch all data from api,
    // 2) if response contain new object, merge this object to the state,
    // 3) use optimistic response and receive only "ok" or status 200 from server and write client data directly to a state, this is will be the fastest way if we don't need to mutate data in aoi
  };
  return (
    <div className={s.addTodo}>
      <input type="text" ref={inputRef} />
      <button onClick={submitHandler}>add new</button>
      {errorIsActive && (
        <div className={s.inputError}>input shouldn&apos;t be empty </div>
      )}
    </div>
  );
}
