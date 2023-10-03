import { AxiosInstance } from "axios";

export const SneakersApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get("sneakers");
    return data;
  },

  async getOne(id: string) {
    const { data } = await instance.get("sneakers/" + id);
    return data;
  },

  async create(dto: any) {
    const { data } = await instance.post("sneakers", dto);
    return data;
  },

  async update(id: string, dto: any) {
    const { data } = await instance.patch("sneakers/" + id, dto);
    return data;
  },

  async upload(formData: any) {
    const { data } = await instance.post("sneakers/upload", formData);
    return data;
  },

  async delete(id: string) {
    const { data } = await instance.delete("sneakers/" + id);
    return data;
  },
});
