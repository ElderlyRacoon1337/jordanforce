import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "@/components/CartItem";
import { Button, Input } from "cutie-ui";
import clsx from "clsx";

export default function cart() {
  const { data, total } = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const localData = [...data];

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.cart}>
          <div className={styles.cartLeft}>
            <h1 className={styles.title}>Корзина</h1>
            <div className={styles.cartItems}>
              {data[0]?.id ? (
                localData
                  .sort((a, b) => {
                    return b.id - a.id;
                  })
                  .map((el: any) => {
                    return <CartItem data={el} />;
                  })
              ) : (
                <p>В корзине пока ничего нет</p>
              )}
            </div>
          </div>
          <div className={styles.cartRight}>
            <h2>Итого</h2>
            <div className={styles.cartRow}>
              <p>Цена товаров</p>
              <p>₽{total}</p>
            </div>
            <div className={styles.cartRow}>
              <p>Доставка</p>
              <p>₽0</p>
            </div>
            <div className={styles.cartRow}>
              <p>Скидка</p>
              <p>₽0</p>
            </div>
            <div className={styles.promocode}>
              <Input
                placeholder="Промокод"
                className={styles.input}
                color="textPrimary"
                button={<Button>Проверить</Button>}
              />
            </div>
            <div className={clsx(styles.cartRow, styles.total)}>
              <p>Всего</p>
              <p>₽{total - discount}</p>
            </div>
            <Button
              className={styles.button}
              variant="contained"
              color="textPrimary"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
