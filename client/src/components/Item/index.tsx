import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import Link from "next/link";
import { countPrice } from "@/utils/countPrice";

interface ItemProps {
  title: string;
  images: string[];
  id: string;
  ruPrice: number;
}

export const Item: React.FC<ItemProps> = ({ title, images, id, ruPrice }) => {
  return (
    <Link href={"/sneakers/" + id}>
      <div className={styles.root}>
        <figure
          className={styles.image}
          style={{
            backgroundImage: `url('http://localhost:3003/${images[0]}')`,
          }}
        />
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.price}>от {ruPrice} руб.</p>

        {/* <IconButton color="red" className={styles.like}>
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
    </Link>
  );
};
