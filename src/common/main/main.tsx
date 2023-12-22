import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/store.hook";
import { AppDispatch } from "../../core/store/store";
import { coinsSlice } from "../../core/coins/coins.reducer";
import { checkForWin, makeNewMatrix } from "../../core/game/game.util";

const availableSymbols = ["X", "O", "Z", "Y", "Q", "M", "J", "K", "T"];

export const Main: React.FC = () => {
  const [matrix, setMatrix] = useState(makeNewMatrix(availableSymbols));
  const [betAmount, setBetAmount] = useState<number>(0);

  const coins = useAppSelector((state) => state.coins.value);
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        minHeight: "100%",
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3>Coins: {coins}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
          alignItems: "center",
        }}
      >
        {matrix.map((row, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
                minWidth: "50%",
              }}
            >
              {row.map((value, j) => {
                return (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "red",
                      minWidth: "19.8%",
                    }}
                  >
                    <p style={{ flex: 1 }}>{value}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          marginLeft: 50,
          marginRight: 50,
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <button
            style={{ flex: 1 }}
            onClick={() => {
              setBetAmount((prevState) => Math.max(prevState - 1, 0));
              //dispatch({ type: coinsSlice.actions.decrement.type })
            }}
          >
            {"<"}
          </button>
          <p style={{ flex: 2 }}>{betAmount}</p>
          <button
            style={{ flex: 1 }}
            onClick={() => {
              setBetAmount((prevState) => prevState + 1);
              // dispatch({ type: coinsSlice.actions.increment.type })
            }}
          >
            {">"}
          </button>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              if (coins < betAmount) {
                console.log("NOT ENOUGH COINS M'LORD");
                return;
              }
              dispatch({
                type: coinsSlice.actions.incrementByAmount.type,
                payload: -betAmount,
              });
              const newMatrix = makeNewMatrix(availableSymbols);
              setMatrix(newMatrix);
              console.log(checkForWin(newMatrix) ? "YOU WIN" : "YOU LOSE");
            }}
          >
            SPIN
          </button>
        </div>
      </div>
    </div>
  );
};
