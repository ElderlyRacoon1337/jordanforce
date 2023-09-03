import { AxiosInstance } from "axios";

export const OrderApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get("orders");
    return data;
  },

  async getOrdersByUser(id: number) {
    const { data } = await instance.get(`orders/${id}`);
    return data;
  },
});
