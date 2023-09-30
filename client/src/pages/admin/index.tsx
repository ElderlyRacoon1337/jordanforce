import React, { use } from "react";
import styles from "./Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";

export default function Admin({ sneakers, orders, users }: any) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={0} />
          </div>
          <div className={styles.rightSide}>
            <h1>Статистика</h1>
            <div className={styles.statsArea}>
              <div className={styles.statsArea__item}>
                <h2>{users?.length}</h2>
                <p>Пользователей</p>
              </div>
              <div className={styles.statsArea__item}>
                <h2>{orders?.length}</h2>
                <p>Заказов</p>
              </div>
              <div className={styles.statsArea__item}>
                <h2>{sneakers?.length}</h2>
                <p>Товара</p>
              </div>
              <div className={styles.statsArea__item}>
                <h2>2</h2>
                <p>Заказов выполнено</p>
              </div>
              <div className={styles.statsArea__item}>
                <h2>43000</h2>
                <p>Оборот</p>
              </div>
              <div className={styles.statsArea__item}>
                <h2>12000</h2>
                <p>Заработано</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const users = await Api(ctx).user.getAll();
    const orders = await Api(ctx).orders.getAll();
    const sneakers = await Api().sneakers.getAll();

    return {
      props: {
        users,
        orders,
        sneakers,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {},
    };
  }
};
