import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faBehance,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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

export default socialMedias;
