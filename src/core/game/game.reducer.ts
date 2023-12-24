import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameStateType } from "./game.types";

const initialState: GameStateType = { numberOfSpins: 0 };

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increment: (state) => {
      state.numberOfSpins += 1;
    },
    decrement: (state) => {
      state.numberOfSpins -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfSpins += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = gameSlice.actions;

export default gameSlice.reducer;
