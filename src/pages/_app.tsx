import "bootstrap/dist/css/bootstrap.min.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import CheckName from "~/Components/CheckName";
import MainLayout from "~/Layout/MainLayout";
import { MAIN_TITLE } from "~/conf";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{MAIN_TITLE}</title>
      </Head>
      <main>
        <MainLayout>
          <CheckName />
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
