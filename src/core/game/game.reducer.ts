import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameStateType } from "./game.types";
import { makeNewMatrix } from "./game.util";
import { fillerSymbolAmount } from "./game.const";

const initialState: GameStateType = {
  numberOfSpins: 0,
  symbolMatrix: makeNewMatrix(),
  betAmount: 1,
  spinResult: 0,
  spinning: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBet: (state, action: PayloadAction<number>) => {
      state.betAmount = action.payload;
    },
    decrementBet: (state, action: PayloadAction<number>) => {
      state.betAmount -= action.payload ?? -1;
    },
    incrementBet: (state, action: PayloadAction<number>) => {
      state.betAmount += action.payload ?? 1;
    },
    spinStart: (state) => {
      state.numberOfSpins += 1;
      state.spinning = true;
    },
    spinFinish: (state) => {
      state.spinning = false;
    },
    setSpinResult: (state, action: PayloadAction<number>) => {
      state.spinResult = action.payload;
    },
    setMatrix: (state, action: PayloadAction<string[][]>) => {
      const length = state.symbolMatrix.length;
      state.symbolMatrix = [
        [...state.symbolMatrix[length - 3]],
        [...state.symbolMatrix[length - 2]],
        [...state.symbolMatrix[length - 1]],
        // The 30 beneath dictates how many symbols there's going to be inbetween and how long the spins last.
        // In a real game id crank it up and speed up the animation for a better spinning feel
        ...makeNewMatrix(false, fillerSymbolAmount),
        ...action.payload,
      ];
      state.spinResult = 0;
    },
  },
});

export const {
  setBet,
  decrementBet,
  incrementBet,
  spinStart,
  spinFinish,
  setSpinResult,
  setMatrix,
} = gameSlice.actions;

export default gameSlice.reducer;
