import { put, select, takeLatest } from "redux-saga/effects";
import { gameSlice } from "./game.reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getGameResult, makeNewMatrix, symbolHierarchy } from "./game.util";
import { coinsSlice } from "../coins/coins.reducer";

function* spinAfterEffects({ payload }: PayloadAction<number>) {
  try {
    const numberOfSpins: number = yield select((state: RootState) => {
      return state.game.numberOfSpins;
    });
    const newMatrix = makeNewMatrix(symbolHierarchy, numberOfSpins % 4 === 0);
    yield put({ type: gameSlice.actions.setMatrix.type, payload: newMatrix });
    const result = getGameResult(newMatrix, payload);
    if (result) {
      console.log("WON " + result + " COINS!!");
      yield put({
        type: coinsSlice.actions.incrementByAmount.type,
        payload: result,
      });
    } else {
      console.log("loss");
    }
  } catch (error) {
    console.log(error);
    yield error;
  }
}

export function* handleSpin() {
  yield takeLatest("game/spin", spinAfterEffects);
}
