import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { Button, Icon, IconButton, Input, Link, Tab, Tabs } from "cutie-ui";

export const Auth = ({ setPopupOpen }: any) => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root} onClick={() => setPopupOpen(false)}>
      <div className={styles.authModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <p className={styles.welcome}>Добро пожаловать</p>
          <IconButton
            color="textPrimary"
            size="large"
            onClick={() => {
              setPopupOpen(false);
            }}
          >
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
        <Tabs
          // variant="contained"
          color="black"
          size="small"
          // fullWidth
          value={value}
          onChange={handleChange}
          labels={["Вход", "Регистрация"]}
        >
          <Tab className={styles.tab}>
            <Input
              label
              className={styles.input}
              size="large"
              placeholder="Email"
              autoFocus
            />
            <Input className={styles.input} size="large" placeholder="Пароль" />
            <Button
              color="textPrimary"
              size="large"
              variant="contained"
              className={styles.button}
            >
              Продолжить
            </Button>
            <Link
              onClick={(e) => {
                handleChange(e, 2);
              }}
              className={styles.link}
            >
              Нет аккаунта? Зарегистрироваться
            </Link>
          </Tab>
          <Tab className={styles.tab}>
            <Input
              className={styles.input}
              size="large"
              placeholder="Имя"
              autoFocus
            />
            <Input className={styles.input} size="large" placeholder="Email" />
            <Input className={styles.input} size="large" placeholder="Пароль" />
            <Button
              color="textPrimary"
              size="large"
              variant="contained"
              className={styles.button}
            >
              Продолжить
            </Button>
            <Link
              className={styles.link}
              onClick={(e) => {
                handleChange(e, 1);
              }}
            >
              Уже есть аккаунт? Войти
            </Link>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
