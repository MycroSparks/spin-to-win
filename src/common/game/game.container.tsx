import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/store.hook";
import { SlotMachine } from "../slot-machine/slot-machine.component";
import { GameControls } from "./game-controls.component";
import { Stage } from "react-pixi-fiber";
import { spinFinish } from "../../core/game/game.reducer";
import { Popup } from "../components/popup.component";

export const GameContainer: React.FC = () => {
  const [stageSize, setStageSize] = useState({
    height: window.innerHeight / 2,
    width: window.innerWidth,
  });
  const [winPopup, setWinPopup] = useState(false);

  const coins = useAppSelector((state) => state.coins.value);
  const { numberOfSpins, symbolMatrix, spinning, spinResult } = useAppSelector(
    (state) => state.game
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onresize = () => {
      setStageSize({
        height: window.innerHeight / 2,
        width: window.innerWidth,
      });
    };
  }, []);

  useEffect(() => {
    if (spinResult) {
      setWinPopup(true);
    }
  }, [spinResult]);

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        minHeight: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ flex: 1 }}>Coins: {coins}</p>
        <p style={{ flex: 1 }}>Rolls: {numberOfSpins}</p>
      </div>
      <div
        style={{
          display: "flex",
          flex: 2,
        }}
      >
        <Popup
          containerStyle={{
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
          open={winPopup}
          setOpen={setWinPopup}
          closeOnContentClick
          noDefaultCloseButton
        >
          <h3>YOU WON {spinResult} COINS!</h3>
          <h6>(click on popup to dismiss)</h6>
        </Popup>
        <Stage options={{ ...stageSize, backgroundColor: 0xffffff }}>
          <SlotMachine
            matrix={symbolMatrix}
            containerSize={stageSize}
            spinning={spinning}
            onSpinningStop={() => {
              dispatch(spinFinish());
            }}
          />
        </Stage>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        {/* Another way would be to have this component handle all the logic and dispatching by having GameControls 
        have onWin and onRoll props but for the purpose of this test there won't be plenty more components so it's fine (won't be complex even like this) */}
        <GameControls currentCoins={coins} spinning={spinning} />
      </div>
    </div>
  );
};
