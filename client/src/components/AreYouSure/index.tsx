import React from "react";
import styles from "./AreYouSure.module.scss";
import { Button } from "cutie-ui";

export const AreYouSure = ({ email, setOpen, setSure }: any) => {
  return (
    <div className={styles.root} onClick={() => setOpen(false)}>
      <div
        className={styles.popupEl}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Вы серьезно хотите удалить пользователя {email}?</p>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            color="textPrimary"
            onClick={() => {
              setOpen(false);
              setSure(true);
            }}
            variant="contained"
          >
            Да
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="textPrimary"
            variant="contained"
          >
            Нет
          </Button>
        </div>
      </div>
    </div>
  );
};
