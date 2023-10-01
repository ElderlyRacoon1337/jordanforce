import React from "react";
import styles from "../Admin.module.scss";

import { AdminMenu } from "@/components/AdminMenu";
import { ItemForm } from "@/components/ItemForm";

export default function AddSneakers() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={3} />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.add}>
              <h1>Добавить товар</h1>
              <ItemForm isAdd={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
