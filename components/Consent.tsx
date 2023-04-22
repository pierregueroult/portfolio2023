import { useState } from "react";
import { textFont, codeFont } from "@/lib/fontHandling";
import styles from "@/styles/Consent.module.scss";
import Link from "next/link";

const Consent = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  return (
    <aside
      className={`${textFont.variable} ${styles.consent} ${codeFont.variable} ${
        isClosed ? styles.closed : ""
      }`}
    >
      <h3>Confidentialité</h3>
      <p>
        Ce site suit quelques règles pas bien méchantes, mais qui sont néanmoins
        nécessaires pour bénéficier de la meilleure expérience possible.
        N&apos;hésitez pas à prendre un cookie bien cuit, un verre de lait et à
        lire les mentions légales.
      </p>
      <ul>
        <li>
          <Link href="/legals/privacypolicy">Mentions Légales</Link>
        </li>
        <li>
          <button onClick={() => setIsClosed(true)}>Accepter</button>
        </li>
      </ul>
    </aside>
  );
};

export default Consent;
