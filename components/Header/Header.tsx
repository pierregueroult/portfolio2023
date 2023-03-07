// ! This component is used in the Layout component

// ? import modules
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";

// ? import dependencies
import styles from "@/styles/Header.module.scss";
import Logo from "../Logo";
import { useRouter } from "next/router";
import { titleFont, textFont } from "@/lib/fontHandling";
import { variantsPages, variantsParents } from "@/lib/layoutVariants";

// ? setup routes
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

// ? setup isActiveLink
function isActiveLink(currentPathname: string, href: string): boolean {
  if (href === "/") {
    return href === currentPathname;
  }
  return currentPathname.startsWith(href);
}

type Props = {
  currentPath: string;
};

export default function Header(props: Props) {
  const router = useRouter();

  return (
    <header
      className={`header ${styles.header} ${textFont.variable} ${
        titleFont.variable
      } ${
        variantsPages.includes(props.currentPath) ||
        variantsParents.some((variant) => props.currentPath.startsWith(variant))
          ? styles.translucent
          : ""
      }`}
    >
      <Link href={"/"} className={styles.titleLink}>
        <h2 className={styles.title}>pierre gueroult.</h2>
      </Link>
      <LayoutGroup>
        <nav
          className={`${styles.nav} ${
            variantsParents.some((variant) =>
              props.currentPath.startsWith(variant)
            )
              ? styles.completeHidden
              : ""
          }`}
        >
          <ul className={styles.links}>
            {routes.map(({ name, link }, i) => (
              <li key={i}>
                <Link href={link} className={styles.link} aria-label={name}>
                  {name}
                  {isActiveLink(router.pathname, link) && (
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
