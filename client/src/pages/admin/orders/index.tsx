import React, { useState } from "react";
import styles from "../Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";
import { Icon, IconButton } from "cutie-ui";
import Link from "next/link";

export default function Orders({ orders }: any) {
  if (!orders) {
    return;
  }
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={4} />
          </div>
          <div className={`${styles.rightSide}`}>
            <div className={styles.titles}>
              <div className={styles.title}>Email</div>
              <div className={styles.title}>Товары</div>
              <div className={styles.title}>Дата</div>
              <div className={styles.title}>Статус</div>
              <div className={styles.title}>Удалить</div>
            </div>
            <>
              {orders.map((el: any, i: number) => {
                return (
                  <Link href={`/admin/orders/${el._id}`}>
                    <div className={`${styles.order}`} key={i}>
                      <div>{el.user.email}</div>
                      <div className={styles.orderItemsImages}>
                        {el.sneakers.length <= 3 ? (
                          el.sneakers.map((item: any, i: number) => {
                            console.log(item.id);
                            return (
                              <figure
                                key={i}
                                className={styles.orderItemsImg}
                                style={{
                                  backgroundImage: `url(http://localhost:3003/${item.id[0].images[0]})`,
                                }}
                              />
                            );
                          })
                        ) : (
                          <>
                            {el.sneakers.slice(0, 2).map((item: any) => {
                              return (
                                <figure
                                  key={i}
                                  className={styles.orderItemsImg}
                                  style={{
                                    backgroundImage: `url(http://localhost:3003/${item.id[0].images[0]})`,
                                  }}
                                />
                              );
                            })}
                            <p className={styles.more}>
                              + {el.sneakers.length - 2}
                            </p>
                          </>
                        )}
                      </div>
                      <div>
                        {new Date(el.createdAt).toLocaleDateString("ru")}
                      </div>
                      <div>{el.status}</div>
                      <div>
                        <IconButton color="textPrimary">
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
                    </div>
                  </Link>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const orders = await Api(ctx).orders.getAll();
    console.log(orders);
    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
