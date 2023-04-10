// ! This component is used in the Layout component

// ? import modules
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";

// ? import dependencies
import styles from "@/styles/Header.module.scss";
import { useRouter } from "next/router";
import { titleFont, textFont } from "@/lib/fontHandling";
import { variantsPages, variantsParents } from "@/lib/layoutVariants";
import { useEffect, useState } from "react";

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
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pageName = document.title;
    window.onblur = () => {
      document.title = "Tu vas où comme ça ? 🤔";
    };
    window.onfocus = () => {
      document.title = pageName;
    };
  }, [router]);

  const triggerState = (status?: boolean) => {
    if (status) {
      setActive(status);
    } else {
      if (active) {
        document.body.style.overflowY = "auto";
        document.body.onclick = null;
        setActive(false);
      } else {
        document.body.style.overflowY = "hidden";
        document.body.onclick = () => triggerState();
        setActive(true);
      }
    }
  };

  return (
    <header
      className={`header ${styles.header} ${textFont.variable} ${
        titleFont.variable
      } ${
        (variantsPages.includes(props.currentPath) ||
          variantsParents.some((variant) =>
            props.currentPath.startsWith(variant)
          )) &&
        props.currentPath !== "/projects/all"
          ? styles.translucent
          : ""
      }`}
    >
      <Link href={"/"} className={styles.titleLink}>
        <h2 className={styles.title}>pierre gueroult.</h2>
      </Link>
      <button
        className={styles.burger}
        onClick={() => triggerState()}
        aria-label="Menu"
      >
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
      </button>
      <div
        className={`${styles.overlay} ${active ? styles.overlay__active : ""}`}
        onClick={() => triggerState(false)}
      ></div>

      <LayoutGroup>
        <nav className={`${styles.nav} ${active ? styles.active : ""}`}>
          <ul className={styles.links}>
            {routes.map(({ name, link }, i) => (
              <li
                key={i}
                className={`${
                  variantsParents.some((variant) =>
                    props.currentPath.startsWith(variant)
                  ) && props.currentPath !== "/projects/all"
                    ? styles.completeHidden
                    : ""
                }`}
                onClick={() => triggerState(false)}
              >
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
            <li
              className={`${
                variantsParents.some((variant) =>
                  props.currentPath.startsWith(variant)
                ) && props.currentPath !== "/projects/all"
                  ? styles.isVariant
                  : styles.moreLinkOpen
              }`}
              onClick={() => triggerState(false)}
            >
              <Link
                href={"/projects"}
                className={styles.link}
                aria-label={"Projets"}
              >
                Retour aux projets
              </Link>
            </li>
          </ul>
        </nav>
      </LayoutGroup>
    </header>
  );
}
