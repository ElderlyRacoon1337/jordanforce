import React, { useState } from "react";
import styles from "../Admin.module.scss";
import { GetServerSideProps } from "next";
import { Api } from "@/utils/api";
import { AdminMenu } from "@/components/AdminMenu";
import { Button, Input, Menu, MenuItem } from "cutie-ui";
import { countPrice } from "@/utils/countPrice";

export const Order = ({ order }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [status, setStatus] = useState(order.status);

  return (
    <div className={styles.fullOrder}>
      <div className={styles.container}>
        <div className={styles.fullOrderFlex}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={-1} />
          </div>
          <div className={styles.rightSide}>
            <h1>
              Заказ {order.user.email} от{" "}
              {new Date(order.createdAt).toLocaleDateString("ru")}
            </h1>
            <div className={styles.fullOrderItems}>
              <div className={styles.images}>
                {order.sneakers.map((el, i) => {
                  return (
                    <div>
                      <figure
                        key={i}
                        className={styles.orderItemsImg}
                        style={{
                          backgroundImage: `url(http://localhost:3003/${el.id[0].images[0]})`,
                        }}
                      />
                      <p>{el.id[0].title}</p>
                      <p>{el.size}</p>
                      <p>{el.price}</p>
                    </div>
                  );
                })}
              </div>
              <Input
                className={styles.input}
                size="large"
                other={{
                  onClick: (e) => {
                    setAnchorEl(e.currentTarget);
                  },
                }}
                value={status}
                button={<Button>Изменить</Button>}
              />
            </div>
          </div>
        </div>
      </div>

      <Menu
        fullWidth
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => setStatus("paid")}
          onClose={() => setAnchorEl(null)}
        >
          paid
        </MenuItem>
        <MenuItem
          onClick={() => setStatus("notpaid")}
          onClose={() => setAnchorEl(null)}
        >
          notpaid
        </MenuItem>
        <MenuItem
          onClick={() => setStatus("indelivery")}
          onClose={() => setAnchorEl(null)}
        >
          indelivery
        </MenuItem>
        <MenuItem
          onClick={() => setStatus("delivered")}
          onClose={() => setAnchorEl(null)}
        >
          delivered
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const order = await Api(ctx).orders.getOne(ctx.query.id);
    const mappedOrder = {
      ...order,
      sneakers: await Promise.all(
        order.sneakers.map(async (el, i) => {
          const newPrice = await countPrice(el.price);
          return { ...el, price: newPrice };
        })
      ),
    };
    console.log(mappedOrder);

    return {
      props: {
        order: mappedOrder,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {},
    };
  }
};
