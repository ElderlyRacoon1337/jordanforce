import React from "react";
import styles from "./CartItem.module.scss";
import { Icon, IconButton } from "cutie-ui";

export const CartItem = ({ data }: any) => {
  return (
    <div className={styles.root}>
      <figure
        className={styles.img}
        style={{
          backgroundImage: `url(http://localhost:3003/${data.images[0]})`,
        }}
      />
      <div className={styles.titles}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.model}>{data.model}</p>
      </div>
      <div className={styles.prices}>
        <p className={styles.price}>₽{data.price}</p>
        <p className={styles.delivery}>Доставка включена в стоимость</p>
      </div>
      <div className={styles.sizequant}>
        <p className={styles.size}>
          Размер: <span>{data.size}</span>
        </p>
        <p className={styles.quantity}>
          Количество: <span>1</span>
        </p>
      </div>
      <div className={styles.delete}>
        <IconButton color="textPrimary">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Icon>
        </IconButton>
      </div>
    </div>
  );
};
