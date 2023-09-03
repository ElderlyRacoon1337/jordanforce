import React from "react";
import styles from "./Admin.module.scss";
import { AdminMenu } from "@/components/AdminMenu";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";
import { Icon, IconButton } from "cutie-ui";

export default function Users({ users }: any) {
  if (!users) {
    return;
  }
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={1} />
          </div>
          <div className={styles.rightSide + " " + styles.users}>
            <>
              <div className={styles.user}>
                <div style={{ fontWeight: 600 }}>Имя</div>
                <div style={{ fontWeight: 600 }}>Почта</div>
                <div style={{ fontWeight: 600 }}>Дата создания</div>
                <div style={{ fontWeight: 600 }}>Удалить</div>
              </div>
              {users.map((el: any, i: number) => {
                return (
                  <div className={styles.user} key={i}>
                    <div>{el.name}</div>
                    <div>{el.email}</div>
                    <div>{new Date(el.createdAt).toLocaleDateString("ru")}</div>
                    <div>
                      <IconButton>
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
    const users = await Api(ctx).user.getAll();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
