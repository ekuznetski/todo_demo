import queryClient from "@state/queryClient";
import "@styles/globals.css";
import s from "@styles/todo.module.scss";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const clientInstance = useRef(queryClient);
  return (
    <QueryClientProvider client={clientInstance.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className={s.pageWrapper}>
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
