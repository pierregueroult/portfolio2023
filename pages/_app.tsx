//  ? import modules
import { AppProps } from "next/app";
import { Router } from "next/router";
import { DefaultSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import NProgress from "nprogress";

// ? import dependencies
import Footer from "@/components/Footer/Footer";
import "@/styles/_global.scss";
import Header from "@/components/Header/Header";

// ? setup nprogress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// ? main component
function MainApp({ Component, pageProps, router }: AppProps) {
  const currentUrl = "https://pierregueroult.dev" + router.route;
  return (
    <>
      <DefaultSeo
        titleTemplate="Pierre Gueroult - %s"
        openGraph={{
          type: "website",
          locale: "fr",
          title: "Pierre Gueroult - Portfolio 2023",
          images: [], // TODO: à remplir
          description: "Le portfolio 2023 de Pierre Gueroult, développeur",
          site_name: "Pierre Gueroult - Développeur - pierregueroult.dev",
        }}
      />
      <Header currentPath={router.route} />
      <AnimatePresence
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={currentUrl} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MainApp;
