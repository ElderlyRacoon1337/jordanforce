import { GetServerSidePropsContext, NextPageContext } from "next";
import axios from "axios";
import { UserApi } from "./userApi";
import { SneakersApi } from "./sneakersApi";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  sneakers: ReturnType<typeof SneakersApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  // @ts-ignore
  // const access_token = ctx?.req?.user;
  // console.log(access_token, " access!");

  const instance = axios.create({
    baseURL: "http://localhost:3003",
    headers: {
      // Authorization: "Bearer " + access_token,
    },
  });

  return {
    user: UserApi(instance),
    sneakers: SneakersApi(instance),
  };
};

const instance = axios.create({
  baseURL: "http://localhost:3003",
});

export default instance;
