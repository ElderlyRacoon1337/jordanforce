import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Item {
  _id: string;
  title: string;
  price: number;
  images: string[];
  size: number;
  isAvailable: boolean;
  model: string;
  createdAt: string;
}

interface CartState {
  data: Item[];
  total: number;
}

const initialState: CartState = {
  data: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
      state.total += action.payload.price;
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
