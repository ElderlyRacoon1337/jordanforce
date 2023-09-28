import { Api } from "@/utils/api";
import { NextPage, NextPageContext } from "next";
import React from "react";
import styles from "./Sneakers.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
            <Swiper
              navigation={true}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              {data.images.map((el, i) => (
                <SwiperSlide>
                  <figure
                    className={styles.img}
                    style={{
                      backgroundImage: `url(http://localhost:3003/${el})`,
                    }}
                    key={i}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.sneakersRight}>
            <h2>{data.title}</h2>
            <p>{data.model}</p>
            <p>{data.price}</p>
            {data.sizes.map((el, i) => (
              <p key={i}>
                {el.size} - {el.price}
              </p>
            ))}
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
