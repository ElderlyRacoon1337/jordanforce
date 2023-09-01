import React from "react";
import styles from "./Items.module.scss";
import { Item } from "../Item";
import data from "../../../data.json";

export const Items = ({ sneakers }: any) => {
  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.items}>
          {sneakers.map((el, i) => {
            return <Item key={i} title={el.title} image={el.img} />;
          })}
        </div>
      </div>
    </div>
  );
};
