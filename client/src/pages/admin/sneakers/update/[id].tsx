import React from "react";
import styles from "../../Admin.module.scss";

import { AdminMenu } from "@/components/AdminMenu";
import { ItemForm } from "@/components/ItemForm";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";

export default function AddSneakers({ sneakers }: any) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={-1} />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.add}>
              <h1>Изменить товар</h1>
              <ItemForm isAdd={false} data={sneakers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const sneakers = await Api(ctx).sneakers.getOne(ctx.query.id);

    return {
      props: {
        sneakers,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
