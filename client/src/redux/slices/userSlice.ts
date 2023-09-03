import { HYDRATE } from "next-redux-wrapper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum LoadingStatus {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface UserState {
  data: any;
  loadingStatus: LoadingStatus;
}

const initialState: UserState = {
  data: null,
  loadingStatus: LoadingStatus.NEVER,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.user.data) {
        state.data = { ...action.payload.user.data };
        state.loadingStatus = LoadingStatus.LOADED;
      }
    });
  },
});

export const { setUserData, setLoadingStatus } = user.actions;

export default user.reducer;

// selectors
export const selectUserData = (state: RootState) => state.user.data;
export const selectIsAuth = (state: RootState) => Boolean(state.user.data);
