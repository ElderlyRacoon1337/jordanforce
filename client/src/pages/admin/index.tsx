import React from "react";
import styles from "./Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";

export default function Admin() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={0} />
          </div>
          <div className={styles.rightSide}></div>
        </div>
      </div>
    </div>
  );
}
