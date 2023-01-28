// ? import modules
import Link from "next/link";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";

// ? import dependencies
import styles from "./Header.module.scss";
import Logo from "../Logo";
import { useRouter } from "next/router";
import { titleFont, textFont } from "@/lib/fontHandling";

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
      className={`${styles.header} ${textFont.variable} ${titleFont.variable}`}
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
