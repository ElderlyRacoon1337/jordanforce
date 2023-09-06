import { GetServerSidePropsContext, NextPageContext } from "next";
import axios from "axios";
import { UserApi } from "./userApi";
import { SneakersApi } from "./sneakersApi";
import Cookies, { parseCookies } from "nookies";
import { OrderApi } from "./orderApi";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  sneakers: ReturnType<typeof SneakersApi>;
  orders: ReturnType<typeof OrderApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const access_token = cookies.access_token;

  const instance = axios.create({
    baseURL: "http://localhost:3003",
    headers: {
      Authorization: "Bearer " + access_token,
      Cookie: `access_token=${access_token};`,

      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    },
    withCredentials: true,
  });

  return {
    user: UserApi(instance),
    sneakers: SneakersApi(instance),
    orders: OrderApi(instance),
  };
};

const instance = axios.create({
  baseURL: "http://localhost:3003",
});

export default instance;
