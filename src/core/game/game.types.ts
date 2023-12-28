import { SET_BET } from "./game.actions";

export interface GameStateType {
  numberOfSpins: number;
  symbolMatrix: string[][];
  betAmount: number;
  spinResult: number;
  spinning: boolean;
}

export interface SetBetPayload {
  value: number;
}

export interface SetBetRequest {
  type: typeof SET_BET;
  payload: SetBetPayload;
}

export type GameActions = SetBetRequest;
