import React, { useEffect, useState } from "react";
import styles from "./Size.module.scss";
import { countPrice } from "@/utils/countPrice";

export const Size = ({ i, size, price }: any) => {
  return (
    <div className={styles.size} key={i}>
      <p className={styles.sizeSize}>{size}</p>
      <p className={styles.sizePrice}>₽{price}</p>
    </div>
  );
};
