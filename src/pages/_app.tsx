import ProgressBar from "@badrap/bar-of-progress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { getSession, SessionProvider } from "next-auth/react";
import App, { AppContext } from "next/app";
import { Router } from "next/router";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-loading-skeleton/dist/skeleton.css";
import AdminLayout from "@/components/layouts/store-admin";
import GuestLayout from "@/components/layouts/guest";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const progress = new ProgressBar({
  size: 4,
  color: "#232F3E",
  className: "z-50",
  delay: 250,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const routeWithoutLayout = ["/login", "/register", "/forgot-password"];

const routeWithGuestLayout = [
  "/",
  "/search",
  "/checkout",
  "/success",
  "/orders",
  "/product/[slug]",
  "/category/[id]",
];

const routeWithAdminLayout = [
  "/dashboard",
  "/product",
  "/reports",
  "/product/create",
  "/product/edit/[id]",
];

const queryClient = new QueryClient();

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: any) {
  if (routeWithGuestLayout.includes(router.pathname))
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <GuestLayout>
              <Toaster />
              <Component {...pageProps} />
            </GuestLayout>
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    );
  else if (routeWithAdminLayout.includes(router.pathname))
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AdminLayout>
              <Toaster containerClassName="" />
              <Component {...pageProps} />
            </AdminLayout>
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    );

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster containerClassName="" />
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}

const unprotectedPages = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/",
  "/category/[id]",
];

type JWTDecoded = {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: number;
  prv: string;
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { req, res } = context.ctx;

  const refererUrl = req?.headers.referer || req?.url;

  const session = await getSession({
    req,
  });

  if (unprotectedPages.includes(context.router.pathname)) {
    // if route is unprotected, don't check for session
  } else {
    if (session && session.accessToken) {
      const decoded = jwtDecode<JWTDecoded>(session.accessToken);
      const tokenExpired = new Date(decoded.exp * 1000) < new Date();

      // [CLIENT] If jwt is expired, redirect to login page
      if (!res && tokenExpired) {
        window.location.href =
          "/login?redirect=" + encodeURIComponent(window.location.href);
        return;
      }

      // [SERVER] protected pages
      if (res && tokenExpired) {
        res?.writeHead(302, {
          Location:
            "/login?redirect=" + encodeURIComponent(refererUrl as string),
        });
        res?.end();
      }
    } else {
      res?.writeHead(302, {
        Location: "/login?redirect=" + encodeURIComponent(refererUrl as string),
      });
      res?.end();
    }
  }

  return {
    ...appProps,
    session,
  };
};

export default MyApp;
