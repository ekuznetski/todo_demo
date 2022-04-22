import { AddNewTodo } from "@components/addNewTodo";
import { ListOfTodos } from "@components/listOfTodos";
import { EQueryKeys } from "@enums/queryKeys.enum";
import { ITodos } from "@interfaces/todos.interface";
import queryClient from "@state/queryClient";
import { fetchTodos } from "@utils/fetch";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { NextPageContext } from "next";
import { dehydrate, useQuery } from "react-query";

const Home = () => {
  const { data } = useQuery<ITodos>(EQueryKeys.todos);

  return data ? (
    <>
      <h1>TODO List</h1>
      <AddNewTodo />
      <ListOfTodos />
    </>
  ) : null;
};

export default Home;

export async function getServerSideProps(
  props: NextPageContext & GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  await queryClient.prefetchQuery(EQueryKeys.todos, fetchTodos);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
