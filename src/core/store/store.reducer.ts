import coinsReducer from "../coins/coins.reducer";
import { CoinsStateType } from "../coins/coins.types";
import { combineSlices } from "@reduxjs/toolkit";
import gameReducer from "../game/game.reducer";

export interface IAppState {
  coins: CoinsStateType;
}

const rootReducer = combineSlices({
  coins: coinsReducer,
  game: gameReducer,
});

export default rootReducer;
