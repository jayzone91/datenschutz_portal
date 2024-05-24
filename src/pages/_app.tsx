import "bootstrap/dist/css/bootstrap.min.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import MainLayout from "~/Layout/MainLayout";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
