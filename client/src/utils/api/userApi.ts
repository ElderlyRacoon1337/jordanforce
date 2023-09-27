import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get("users");
    return data;
  },

  async register(dto: any) {
    const { data } = await instance.post("auth/register", dto);
    return data;
  },

  async login(dto: any) {
    const { data } = await instance.post("auth/login", dto);
    return data;
  },

  async getMe() {
    const { data } = await instance.get("auth/profile");
    return data;
  },

  async getUser(id: number) {
    const { data } = await instance.get(`users/${id}`);
    return data;
  },

  async deleteUser(id: string) {
    const { data } = await instance.delete(`users/${id}`);
    return data;
  },
});
