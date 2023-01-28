// ? modules
import { Roboto } from "@next/font/google";
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";

// ? icon handling import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faBehance,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// ? dependancies
import styles from "./Footer.module.scss";

// ? font setup
const robotoSlab = Roboto({
  weight: "300",
  subsets: ["latin"],
  variable: "--robotoSlab",
});

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
  return (
    <footer className={`${styles.footer} ${robotoSlab.variable}`}>
      <ul className={styles.socialMedia}>
        {socialMedias.map(({ Icon, url, name }, i) => (
          <li key={i} className={styles.socialMediaChild}>
            <a href={url}>{Icon}</a>
          </li>
        ))}
      </ul>
      <h3 className={styles.text}>
        Coded with <FontAwesomeIcon icon={faHeart} /> by Pierre Guéroult
      </h3>
      <WebsiteCarbonBadge
        url="https://pierregueroult.dev"
        dark={true}
        co2="0.12"
        percentage="75"
        lang="fr"
      />
    </footer>
  );
}

export default Footer;
