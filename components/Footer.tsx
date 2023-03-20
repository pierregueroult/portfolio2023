// ! This component is used in the Layout component

// ? modules import
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";
import { useRouter } from "next/router";

// ? icon handling import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faBehance,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// ? dependencies
import styles from "@/styles/Footer.module.scss";
import { titleFont } from "@/lib/fontHandling";
import { variantsPages } from "@/lib/layoutVariants";

// ? array of social media links
const socialMedias = [
  {
    Icon: <FontAwesomeIcon icon={faLinkedin} />,
    name: "Linked In",
    url: "https://linkedin.com/in/pierregueroult",
  },
  {
    Icon: <FontAwesomeIcon icon={faGithub} />,
    name: "Github",
    url: "https://github.com/pierregueroult",
  },
  {
    Icon: <FontAwesomeIcon icon={faInstagram} />,
    name: "Instagram",
    url: "https://instagram.com/pierre.gueroult",
  },
  {
    Icon: <FontAwesomeIcon icon={faBehance} />,
    name: "Behance",
    url: "https://www.behance.net/pierreguroult",
  },
];

function Footer() {
  const router = useRouter();

  return (
    <footer
      className={`${styles.footer} ${titleFont.variable} ${
        variantsPages.includes(router.pathname) ? styles.hidden : ""
      }`}
    >
      <ul className={styles.socialMedia}>
        {socialMedias.map(({ Icon, url, name }, i) => (
          <li key={i} className={styles.socialMediaChild}>
            <a href={url} aria-label={name}>
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
