import { AxiosInstance } from "axios";

export const SneakersApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get("sneakers");
    return data;
  },
});
