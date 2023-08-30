import React from "react";
import styles from "./Subheader.module.scss";
import { Link } from "cutie-ui";

export const Subheader = () => {
  return (
    <div className={styles.root}>
      <ul className={styles.menu}>
        <Link color="black" className={styles.menu__item}>
          Главная
        </Link>
        <Link color="black" className={styles.menu__item}>
          Доставка
        </Link>
        <Link color="black" className={styles.menu__item}>
          О нас
        </Link>
      </ul>
    </div>
  );
};
