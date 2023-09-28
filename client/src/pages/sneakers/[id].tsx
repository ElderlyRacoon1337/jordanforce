import { Api } from "@/utils/api";
import { NextPage, NextPageContext } from "next";
import React from "react";
import styles from "./Sneakers.module.scss";
import { Button, Icon, IconButton } from "cutie-ui";

interface Sneaker {
  _id: string;
  title: string;
  price: number;
  images: string[];
  sizes: any[];
  isAvailable: boolean;
  model: string;
  createdAt: string;
}

interface SneakersProps {
  data: Sneaker;
}

const sneakers: NextPage<SneakersProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.sneakers}>
          <div className={styles.sneakersLeft}>
            {data.images.map((el, i) => (
              <figure
                className={styles.img}
                style={{
                  backgroundImage: `url(http://localhost:3003/${el})`,
                }}
                key={i}
              />
            ))}
          </div>
          <div className={styles.sneakersRight}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.model}>
              <span>Модель: </span>
              {data.model}
            </p>
            <p className={styles.price}>от ₽{data.price}</p>
            <p className={styles.delivery}>Доставка включена в стоимость</p>
            <div className={styles.sizes}>
              {data.sizes.map((el, i) => (
                <div className={styles.size} key={i}>
                  <p className={styles.sizeSize}>{el.size}</p>
                  <p className={styles.sizePrice}>₽{el.price}</p>
                </div>
              ))}
            </div>
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                variant="contained2"
                color="textPrimary"
                size="large"
              >
                Добавить в корзину
              </Button>
              {/* <IconButton
                className={styles.iconButton}
                // variant="outlined"
                size="large"
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </Icon>
              </IconButton> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sneakers;

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;
  try {
    const data = await Api().sneakers.getOne(id as string);
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
