import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../core/store/store.hook";
import { AppDispatch } from "../../core/store/store";
import { getGameResult, makeNewMatrix } from "../../core/game/game.util";
import { coinsSlice } from "../../core/coins/coins.reducer";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { ThemedText } from "../themed-components/themed-text.component";
import { gameSlice } from "../../core/game/game.reducer";

interface Props {
  setMatrix: Dispatch<SetStateAction<string[][]>>;
  symbolHierarchy: Record<number, string[]>;
  currentCoins: number;
  numberOfSpins: number;
}

export const GameControls: React.FC<Props> = ({
  setMatrix,
  symbolHierarchy,
  currentCoins,
  numberOfSpins,
}) => {
  const [betAmount, setBetAmount] = useState<number>(1);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    return () => stopCounter();
  }, []);

  const startCounter = (value: number, options?: { stopAtNumber?: number }) => {
    if (intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setBetAmount((prevCounter) => {
        const nextValue = prevCounter + value;
        return options?.stopAtNumber
          ? Math.max(nextValue, options.stopAtNumber)
          : nextValue;
      });
    }, 160);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 50,
        marginRight: 50,
        alignItems: "center",
      }}
    >
      <Box
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant={"contained"}
            onMouseDown={() => {
              setBetAmount((prevState) => Math.max(prevState - 1, 1));
              startCounter(-1, { stopAtNumber: 1 });
            }}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
            onClick={() => {
              // setBetAmount((prevState) => Math.max(prevState - 1, 0));
              //dispatch({ type: coinsSlice.actions.decrement.type })
            }}
          >
            {"<"}
          </Button>
        </span>
        <span
          style={{ display: "flex", minWidth: 50, justifyContent: "center" }}
        >
          <ThemedText variant={"h4"}>{betAmount}</ThemedText>
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant={"contained"}
            onMouseDown={() => {
              setBetAmount((prevState) => prevState + 1);
              startCounter(1);
            }}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
            // onClick={() => {
            // setBetAmount((prevState) => prevState + 1);
            //   // dispatch({ type: coinsSlice.actions.increment.type })
            // }}
          >
            {">"}
          </Button>
        </span>
      </Box>
      <Box
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant={"contained"}
          onClick={() => {
            if (currentCoins < betAmount) {
              console.log("NOT ENOUGH COINS M'LORD");
              return;
            }
            dispatch({
              type: coinsSlice.actions.incrementByAmount.type,
              payload: -betAmount,
            });
            dispatch({ type: gameSlice.actions.increment.type });
            const newMatrix = makeNewMatrix(symbolHierarchy, numberOfSpins);
            setMatrix(newMatrix);
            const gameResult = getGameResult(newMatrix, betAmount);
            console.log(gameResult ? "YOU WIN" : "YOU LOSE");
            if (gameResult) {
              //WIN
              dispatch({
                type: coinsSlice.actions.incrementByAmount.type,
                payload: gameResult,
              });
            } else {
              //LOSE
            }
          }}
        >
          SPIN
        </Button>
      </Box>
    </Box>
  );
};
