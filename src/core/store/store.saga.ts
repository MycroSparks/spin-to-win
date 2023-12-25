import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "../coins/coins.saga";
import { handleSpin } from "../game/game.saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetUser),
    fork(handleSpin),
    // Other forks
  ]);
};

export default rootSaga;
