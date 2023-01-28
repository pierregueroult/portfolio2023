// ? import modules
import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { motion } from "framer-motion";

// ? some type and interface
type Props = {
  children: ReactNode;
  title: string;
  description: string;
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
function Layout({ children, title, description }: Props): JSX.Element {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <motion.main
        initial="hide"
        animate="show"
        exit="out"
        variants={animation}
        transition={{ type: "linear" }}
      >
        {children}
      </motion.main>
    </>
  );
}

export default Layout;
