import { Api } from "@/utils/api";
import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import styles from "./Sneakers.module.scss";
import { Button, Loader } from "cutie-ui";
import { Size } from "@/components/Size";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import { FullImage } from "@/components/FullImage";

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

const sneakers: NextPage<SneakersProps> = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.data);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [fullImageSrc, setFullImageSrc] = useState("");

  const isInCart = useSelector((state) =>
    Boolean(
      state.cart.data.find(
        (el) => el.size == selectedSize && el._id == data._id
      )
    )
  );

  const handleAddToCart = () => {
    setIsAddLoading(true);
    setTimeout(() => {
      try {
        const newItem = {
          ...data,
          price: data.sizes.find((el: any) => el.size == selectedSize).price,
          size: selectedSize,
          id: cartItems.length + 1,
        };
        dispatch(addItem(newItem));
        localStorage.setItem("cart", JSON.stringify([newItem, ...cartItems]));
        setIsAddLoading(false);
      } catch (error) {
        console.log(error);
        setIsAddLoading(false);
      }
    }, 500);
  };

  const handleClickImage = (src: string) => {
    setFullImageOpen(true);
    setFullImageSrc(src);
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.sneakers}>
          <div className={styles.sneakersLeft}>
            {data.images.map((el, i) => (
              <figure
                onClick={() =>
                  handleClickImage(`url(http://localhost:3003/${el})`)
                }
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
              {data.sizes.map((el: any, i: number) => (
                <Size
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  size={el.size}
                  i={i}
                  price={el.price}
                  id={data._id}
                />
              ))}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={
                  selectedSize
                    ? !isInCart
                      ? handleAddToCart
                      : () => {}
                    : () => {}
                }
                className={styles.button}
                variant="contained2"
                color="textPrimary"
                size="large"
              >
                {!isAddLoading ? (
                  isInCart ? (
                    "В корзине"
                  ) : (
                    "Добавить в корзину"
                  )
                ) : (
                  <Loader color="white" size={"17.5px"} fatness={"2px"} />
                )}
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
      {fullImageOpen && (
        <FullImage setFullImageOpen={setFullImageOpen} src={fullImageSrc} />
      )}
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
