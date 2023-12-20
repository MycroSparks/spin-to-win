import coinsReducer from "../coins/coins.reducer";
import { CoinsStateType } from "../coins/coins.types";
import { combineSlices } from "@reduxjs/toolkit";

export interface IAppState {
  coins: CoinsStateType;
}

const rootReducer = combineSlices({
  coins: coinsReducer,
});

export default rootReducer;
