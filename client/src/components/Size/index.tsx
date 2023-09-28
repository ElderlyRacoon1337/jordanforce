import React, { useEffect, useState } from "react";
import styles from "./Size.module.scss";
import { countPrice } from "@/utils/countPrice";
import clsx from "clsx";

export const Size = ({
  i,
  size,
  price,
  selectedSize,
  setSelectedSize,
}: any) => {
  return (
    <div
      onClick={() => setSelectedSize(size)}
      className={clsx(styles.size, selectedSize == size && styles.sizeActive)}
      key={i}
    >
      <p className={styles.sizeSize}>{size}</p>
      <p className={styles.sizePrice}>₽{price}</p>
    </div>
  );
};
