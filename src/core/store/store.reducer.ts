import coinsReducer from "../coins/coins.reducer";
import { CoinsStateType } from "../coins/coins.types";
import { combineSlices } from "@reduxjs/toolkit";
import gameReducer from "../game/game.reducer";
import { GameStateType } from "../game/game.types";

export interface IAppState {
  coins: CoinsStateType;
  game: GameStateType;
}

const rootReducer = combineSlices({
  coins: coinsReducer,
  game: gameReducer,
});

export default rootReducer;
