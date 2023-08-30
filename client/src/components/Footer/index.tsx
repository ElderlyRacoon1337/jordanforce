import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.flex}>
          <div className={styles.column}>
            <li>О нас</li>
            <li>Доставка</li>
            <li>Часто задаваемые вопросы</li>
          </div>
          <div className={styles.column}>
            <li className={styles.title}>Каталог</li>
            <li>Nike Air Jordan 1 low</li>
            <li>Nike Air Jordan 1 high</li>
            <li>Nike Air Jordan 4 low</li>
            <li>Nike Air Jordan 4 high</li>
            <li>Nike Air Force 1</li>
          </div>
          <div className={styles.column}>
            <li className={styles.title}>Контакты</li>
            <li>Email: pavelparshin2002005@gmail.com</li>
            <li>Telegram: t.me/agushaswag</li>
          </div>
        </div>
      </div>
    </div>
  );
};
