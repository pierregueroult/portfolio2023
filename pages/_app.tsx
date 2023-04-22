import { AppProps } from "next/app";
import { Router } from "next/router";
import { DefaultSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";
import Script from "next/script";

// ? import dependencies
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/_global.scss";
import Consent from "@/components/Consent";

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
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "portofolio, portfolio, pierregueroult, student, etudiant, developper, developpeur, javascript, html, css, design, web",
          },
          {
            property: "author",
            content: "Pierre Gueroult",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/icons/250x250.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/icons/250x250.png",
          },
          {
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            rel: "mask-icon",
            href: "/icons/250x250.png",
            color: "#000000",
          },
          {
            rel: "shortcut icon",
            href: "/icons/250x250.png",
          },
        ]}
      />
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-FWSBRY7JL0"
      ></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-FWSBRY7JL0");`,
        }}
      />
      <Script
        id="log-at-start"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `console.log("%cHello there ! 👋", "font-size: 3rem;font-family: Courier; font-weight: 600;"); console.log("%cIf you're here, it means you're interested in the code of this website. I'm Pierre, a french web developer. If you want to know more about me, you can check my portfolio at https://pierregueroult.dev. If you want to contact me, you can send me an email at contact@pierregueroult.dev Have a nice day !", "font-size: 1.2rem;");`,
        }}
      ></Script>
      <Header currentPath={router.route} />
      <AnimatePresence
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={currentUrl} />
      </AnimatePresence>
      <Footer />
      <Consent />
      <Analytics />
    </>
  );
}

export default MainApp;
