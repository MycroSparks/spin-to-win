import { useState } from "react";
import { useAppSelector } from "../../core/store/store.hook";
import { SlotMachine } from "../slot-machine/slot-machine.component";
import { GameControls } from "./game-controls.component";
import { makeNewMatrix } from "../../core/game/game.util";
import { Box } from "@mui/material";
import { ThemedText } from "../themed-components/themed-text.component";

const symbolHierarchy: Record<number, string[]> = {
  0: ["10", "Q", "J"],
  1: ["A", "K"],
  2: ["T"],
  3: ["Y", "Z"],
  4: ["WOW"],
  5: ["SMILE"],
};

export const GameContainer: React.FC = () => {
  const [matrix, setMatrix] = useState(makeNewMatrix(symbolHierarchy, 0));

  const coins = useAppSelector((state) => state.coins.value);
  const { numberOfSpins } = useAppSelector((state) => state.game);

  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "column",
        minHeight: "100%",
        display: "flex",
      }}
    >
      <Box
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText style={{ flex: 1 }} variant={"h3"}>
          Coins: {coins}
        </ThemedText>
        <ThemedText style={{ flex: 1 }} variant={"h3"}>
          Rolls: {numberOfSpins}
        </ThemedText>
      </Box>
      <Box
        style={{
          display: "flex",
          flex: 2,
        }}
      >
        <SlotMachine matrix={matrix} />
      </Box>
      <Box style={{ display: "flex", flex: 1 }}>
        {/* Another way would be to have this component handle all the logic and dispatching by having GameControls 
        have onWin and onRoll props but for the purpose of this test there won't be plenty more components so it's fine (won't be complex even like this) */}
        <GameControls
          setMatrix={setMatrix}
          symbolHierarchy={symbolHierarchy}
          currentCoins={coins}
          numberOfSpins={numberOfSpins}
        />
      </Box>
    </Box>
  );
};
