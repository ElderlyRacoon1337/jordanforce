import React from "react";
import styles from "../Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";
import Link from "next/link";

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
            {sneakers.map((el: any, i: number) => {
              return (
                <Link href={"/admin/sneakers/update/" + el._id}>
                  <div key={i} className={styles.sneakersItem}>
                    <figure
                      style={{
                        backgroundImage: `url(http://localhost:3003/${el.images[0]})`,
                      }}
                    />
                    <h5 className={styles.title}>{el.title}</h5>
                  </div>
                </Link>
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
