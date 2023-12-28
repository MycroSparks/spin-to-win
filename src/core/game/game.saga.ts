import { put, select, takeLatest } from "redux-saga/effects";
import { gameSlice } from "./game.reducer";
import { RootState } from "../store/store";
import { getGameResult, makeNewMatrix } from "./game.util";
import { coinsSlice } from "../coins/coins.reducer";

function* spinAfterEffects() {
  try {
    const numberOfSpins: number = yield select(
      (state: RootState) => state.game.numberOfSpins
    );
    const newMatrix = makeNewMatrix(numberOfSpins % 4 === 0);
    yield put({ type: gameSlice.actions.setMatrix.type, payload: newMatrix });
  } catch (error) {
    console.log(error);
    yield error;
  }
}

function* spinFinishAfterEffects() {
  const matrix: string[][] = yield select(
    (state: RootState) => state.game.symbolMatrix
  );
  const betAmount: number = yield select(
    (state: RootState) => state.game.betAmount
  );

  const result = getGameResult(matrix, betAmount);
  if (result) {
    console.log("WON " + result + " COINS!!");
    yield put({
      type: coinsSlice.actions.incrementByAmount.type,
      payload: result,
    });
    yield put({
      type: gameSlice.actions.setSpinResult.type,
      payload: result,
    });
  } else {
    console.log("loss");
  }
}

export function* handleSpinEnd() {
  yield takeLatest("game/spinFinish", spinFinishAfterEffects);
}

export function* handleSpin() {
  yield takeLatest("game/spinStart", spinAfterEffects);
}
