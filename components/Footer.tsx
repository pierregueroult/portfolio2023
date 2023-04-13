// ! This component is used in the Layout component

// ? modules import
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";
import { useRouter } from "next/router";

// ? icon handling import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// ? dependencies
import styles from "@/styles/Footer.module.scss";
import { textFont } from "@/lib/fontHandling";
import { variantsPages } from "@/lib/layoutVariants";
import socialMedias from "@/lib/socialmedia";
import Link from "next/link";

// ? array of social media links

function Footer() {
  const router = useRouter();

  return (
    <footer
      className={`${styles.footer} ${textFont.variable} ${
        variantsPages.includes(router.pathname) ? styles.hidden : ""
      } ${
        router.pathname.startsWith("/projects/") &&
        router.pathname !== "/projects/all"
          ? styles.projectVariant
          : ""
      }`}
    >
      <ul className={styles.socialMedia}>
        {socialMedias.map(({ Icon, url, name }, i) => (
          <li key={i} className={styles.socialMediaChild}>
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icon}
            </a>
          </li>
        ))}
      </ul>
      <h3 className={styles.text}>
        Coded with
        <FontAwesomeIcon icon={faHeart} />
        by Pierre Guéroult
      </h3>
      <ul className={`${styles.legals}`}>
        <li>
          <Link href="/legals/termsofuse" target="_blank">
            Conditions d&apos;utilisation
          </Link>
        </li>
        <li>
          <Link href="/legals/privacypolicy" target="_blank">
            Politique de confidentialité
          </Link>
        </li>
      </ul>
      <WebsiteCarbonBadge
        url={
          "https://pierregueroult.dev" +
          router.pathname.replace(/\[[^()]*\]/g, "")
        }
        dark={true}
        lang="fr"
      />
    </footer>
  );
}

export default Footer;
