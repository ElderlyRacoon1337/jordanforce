import { Converter } from "easy-currencies";

export const countPrice = async (price: number) => {
  const converter = new Converter();
  const counted = await converter.convert(price, "CNY", "RUB");
  const result = Math.ceil(counted / 100) * 100;
  if (result <= 20000) {
    return result + 5000;
  } else if (result <= 30000) {
    return result + 7000;
  } else {
    return result + 12000;
  }
};
