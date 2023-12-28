import { all, fork } from "redux-saga/effects";
import { handleSpin, handleSpinEnd } from "../game/game.saga";

const rootSaga = function* () {
  yield all([
    fork(handleSpin),
    fork(handleSpinEnd),
    // Other forks
  ]);
};

export default rootSaga;
