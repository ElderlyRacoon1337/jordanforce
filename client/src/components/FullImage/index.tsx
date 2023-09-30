import React from "react";
import styles from "./FullImage.module.scss";

export const FullImage = ({ src, setFullImageOpen }: any) => {
  return (
    <div className={styles.root} onClick={() => setFullImageOpen(false)}>
      <figure style={{ backgroundImage: src }} />
    </div>
  );
};
