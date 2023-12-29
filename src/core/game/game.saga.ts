import { put, select, takeLatest } from "redux-saga/effects";
import { setMatrix, setSpinResult } from "./game.reducer";
import { RootState } from "../store/store";
import { getGameResult, makeNewMatrix } from "./game.util";
import { incrementByAmount } from "../coins/coins.reducer";

function* spinAfterEffects() {
  try {
    const numberOfSpins: number = yield select(
      (state: RootState) => state.game.numberOfSpins
    );
    const newMatrix = makeNewMatrix(numberOfSpins % 4 === 0);
    yield put(setMatrix(newMatrix));
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
    yield put(incrementByAmount(result));
    yield put(setSpinResult(result));
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
