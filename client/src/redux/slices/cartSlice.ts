import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Item {
  id: number;
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
    setItems: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.total = action.payload.reduce((sum, el) => {
        return sum + el.price;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const itemToDelete = state.data.find((el) => el.id == action.payload);
      state.data = state.data.filter((el) => el.id !== action.payload);
      state.total -= itemToDelete?.price;
    },
  },
});

export const { addItem, setItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
