import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameStateType } from "./game.types";
import { makeNewMatrix } from "./game.util";

const initialState: GameStateType = {
  numberOfSpins: 0,
  symbolMatrix: makeNewMatrix(),
  spinResult: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    decrement: (state) => {
      state.numberOfSpins -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfSpins += action.payload;
    },
    spin: (state) => {
      state.numberOfSpins += 1;
    },
    setMatrix: (state, action: PayloadAction<string[][]>) => {
      state.symbolMatrix = action.payload;
    },
  },
});

export const { decrement, incrementByAmount, spin } = gameSlice.actions;

export default gameSlice.reducer;
