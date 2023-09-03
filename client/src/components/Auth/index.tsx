import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { Button, Icon, IconButton, Input, Link, Tab, Tabs } from "cutie-ui";
import { Api } from "@/utils/api";
import {
  LoadingStatus,
  setLoadingStatus,
  setUserData,
} from "@/redux/slices/userSlice";
import { store } from "@/redux/store";

export const Auth = ({ setPopupOpen }: any) => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");

  const handleLogin = async () => {
    store.dispatch(setLoadingStatus(LoadingStatus.LOADING));
    try {
      const data = await Api().user.login({
        email: loginEmail,
        password: loginPassword,
      });
      store.dispatch(setUserData(data));
      store.dispatch(setLoadingStatus(LoadingStatus.LOADED));
    } catch (e) {
      console.log(e);
      store.dispatch(setLoadingStatus(LoadingStatus.ERROR));
    }
    setPopupOpen(false);
  };

  const handleRegistration = async () => {
    try {
      const { data } = await Api().user.register({
        name,
        email: loginEmail,
        password: loginPassword,
      });
      setUserData(data);
      setPopupOpen(false);
    } catch (e) {
      console.log(e);
      setPopupOpen(false);
    }
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
          color="textPrimary"
          size="small"
          value={value}
          onChange={handleChange}
          labels={["Вход", "Регистрация"]}
        >
          <Tab className={styles.tab}>
            <Input
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.currentTarget.value)}
              label
              className={styles.input}
              size="large"
              placeholder="Email"
              autoFocus
            />
            <Input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.currentTarget.value)}
              className={styles.input}
              size="large"
              placeholder="Пароль"
            />
            <Button
              onClick={handleLogin}
              color="submitButton"
              size="large"
              variant="contained3"
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
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className={styles.input}
              size="large"
              placeholder="Имя"
              autoFocus
            />
            <Input
              value={registrationEmail}
              onChange={(e) => setRegistrationEmail(e.currentTarget.value)}
              className={styles.input}
              size="large"
              placeholder="Email"
            />
            <Input
              value={registrationPassword}
              onChange={(e) => setRegistrationPassword(e.currentTarget.value)}
              className={styles.input}
              size="large"
              placeholder="Пароль"
            />
            <Button
              onClick={handleRegistration}
              color="submitButton"
              size="large"
              variant="contained3"
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
