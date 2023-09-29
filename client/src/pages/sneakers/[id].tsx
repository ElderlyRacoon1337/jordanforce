import { Api } from "@/utils/api";
import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import styles from "./Sneakers.module.scss";
import { Button } from "cutie-ui";
import { countPrice } from "@/utils/countPrice";
import { Size } from "@/components/Size";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";

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
  ruPrice: number;
  sizes: any;
}

const sneakers: NextPage<SneakersProps> = ({ data, ruPrice, sizes }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.data);

  const handleAddToCart = () => {
    try {
      const newItem = {
        ...data,
        price: sizes.find((el: any) => el.size == selectedSize).price,
        size: selectedSize,
        id: cartItems.length + 1,
      };
      dispatch(addItem(newItem));
      localStorage.setItem("cart", JSON.stringify([newItem, ...cartItems]));
    } catch (error) {
      console.log(error);
    }
  };

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
            <p className={styles.price}>от ₽{ruPrice}</p>
            <p className={styles.delivery}>Доставка включена в стоимость</p>
            <div className={styles.sizes}>
              {sizes.map((el: any, i: number) => (
                <Size
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  size={el.size}
                  i={i}
                  price={el.price}
                />
              ))}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={handleAddToCart}
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

    const ruPrice = await countPrice(data.price);
    const sizes = await Promise.all(
      data.sizes.map(async (el: any) => {
        const price = await countPrice(el.price);
        return { ...el, price };
      })
    );

    return { props: { data, ruPrice, sizes } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
