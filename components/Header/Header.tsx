// ? import modules
import Link from "next/link";
import { Roboto, Roboto_Slab } from "@next/font/google";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";

// ? import dependencies
import styles from "./Header.module.scss";
import Logo from "../Logo";
import { useRouter } from "next/router";

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
  variable: "--roboto",
});

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
  variable: "--robotoSlab",
});

const routes: { name: string; link: string }[] = [
  {
    name: "Accueil",
    link: "/",
  },
  {
    name: "À Propos",
    link: "/about",
  },
  {
    name: "Projets",
    link: "/projects",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

function isActiveLink(currentPathname: string, href: string): boolean {
  if (href === "/") {
    return href === currentPathname;
  }
  return currentPathname.startsWith(href);
}

export default function Header() {
  const router = useRouter();
  return (
    <header
      className={`${styles.header} ${roboto.variable} ${robotoSlab.variable}`}
    >
      <Logo />
      <LayoutGroup>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            {routes.map(({ name, link }, i) => (
              <li key={i}>
                <Link href={link} className={styles.link}>
                  {name}
                  {isActiveLink(link, router.pathname) && (
                    <motion.div
                      layoutId="navigation-underline"
                      className={styles.linkIsActive}
                      animate
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </LayoutGroup>
    </header>
  );
}
