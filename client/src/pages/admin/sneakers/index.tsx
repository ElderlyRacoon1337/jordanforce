import React from "react";
import styles from "../Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";

export default function Sneakers({ sneakers }: any) {
  if (!sneakers) return;
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={2} />
          </div>
          <div className={`${styles.rightSide} ${styles.sneakers}`}>
            {sneakers.map((el, i) => {
              return (
                <div className={styles.sneakersItem}>
                  <figure style={{ backgroundImage: `url(${el.imageUrl})` }} />
                  <h5 className={styles.title}>{el.title}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const sneakers = await Api(ctx).sneakers.getAll();

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
