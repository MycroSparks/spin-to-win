import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../core/store/store.hook";
import { incrementByAmount } from "../../core/coins/coins.reducer";
import { setBet, spinStart } from "../../core/game/game.reducer";
import { Popup } from "../components/popup.component";
import { Paytable } from "./game-paytable.component";

interface Props {
  currentCoins: number;
  spinning: boolean;
}

export const GameControls: React.FC<Props> = ({ currentCoins, spinning }) => {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [paytablePopup, setPaytablePopup] = useState(false);
  const [spinnable, setSpinnable] = useState(true);

  const intervalRef = useRef<number | null>(null);

  const dispatch = useAppDispatch();

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch(setBet(betAmount));
    }
  };

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

  useEffect(() => {
    return () => stopCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A little spin cooldown for a nicer feel and to allow the user to register the results of the spin
  useEffect(() => {
    let timeout: number | undefined;
    if (spinning) {
      setSpinnable(false);
    } else {
      timeout = setTimeout(() => {
        setSpinnable(true);
      }, 100);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [spinning]);

  return (
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
      <Popup
        containerStyle={{
          flex: 1,
          backgroundColor: "rgba(0,0,0, 0.8)",
          display: "flex",
        }}
        open={paytablePopup}
        setOpen={setPaytablePopup}
        closeOnOutsideClick
        closeOnContentClick
        noDefaultCloseButton
      >
        <Paytable />
      </Popup>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <button
            onMouseDown={() => {
              setBetAmount((prevState) => Math.max(prevState - 1, 1));
              startCounter(-1, { stopAtNumber: 1 });
            }}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
          >
            {"<"}
          </button>
        </span>
        <span
          style={{ display: "flex", minWidth: 50, justifyContent: "center" }}
        >
          <p>{betAmount}</p>
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <button
            onMouseDown={() => {
              setBetAmount((prevState) => prevState + 1);
              startCounter(1);
            }}
            onMouseUp={() => {
              stopCounter();
            }}
            onMouseLeave={stopCounter}
          >
            {">"}
          </button>
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          disabled={!spinnable}
          onClick={() => {
            setPaytablePopup(true);
          }}
        >
          Paytable
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
          disabled={!spinnable}
          onClick={() => {
            if (currentCoins < betAmount) {
              return;
            }
            dispatch(incrementByAmount(-betAmount));
            dispatch(spinStart());
          }}
        >
          SPIN
        </button>
      </div>
    </div>
  );
};
