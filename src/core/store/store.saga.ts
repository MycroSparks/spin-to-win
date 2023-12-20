import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "../coins/coins.saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetUser),
    // Other forks
  ]);
};

export default rootSaga;
