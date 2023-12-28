import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoinsStateType } from "./coins.types";

const initialState: CoinsStateType = { value: 2000 };

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = coinsSlice.actions;

export default coinsSlice.reducer;
