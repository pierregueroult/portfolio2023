// ? import modules
import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { motion } from "framer-motion";
// ? import other files
import { titleFont, textFont, codeFont } from "@/lib/fontHandling";

// ? some type and interface
type Props = {
  children: ReactNode;
  title: string;
  description: string;
  canonical?: string;
};

type AnimationPattern = {
  [key: string]: {
    opacity: number;
    x: number;
    y: number;
  };
};

// ? animation data for framer
const animation: AnimationPattern = {
  hide: { opacity: 0, x: 0, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
  out: { opacity: 0, x: 0, y: 0 },
};

// ? main component
function Layout({
  children,
  title,
  description,
  canonical,
}: Props): JSX.Element {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical ? canonical : "https://pierregueroult.dev"}
        openGraph={{
          title: title,
          description: description,
          url: canonical ? canonical : "https://pierregueroult.dev",
          siteName: title,
        }}
      />
      <motion.main
        initial="hide"
        animate="show"
        exit="out"
        variants={animation}
        transition={{ type: "linear" }}
        className={`${textFont.variable} ${titleFont.variable} ${codeFont.variable}`}
      >
        {children}
      </motion.main>
    </>
  );
}

export default Layout;
