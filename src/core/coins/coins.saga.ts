import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

function* doSome({ payload: value }: PayloadAction<number>) {
  try {
    //console the next value
    console.log("sagatest");
    yield null;
  } catch (error) {
    console.log(error);
    yield error;
  }
}

export function* watchGetUser() {
  yield takeLatest("coins/increment", doSome);
}
