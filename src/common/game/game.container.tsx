import { useAppSelector } from "../../core/store/store.hook";
import { SlotMachine } from "../slot-machine/slot-machine.component";
import { GameControls } from "./game-controls.component";
import { Box } from "@mui/material";
import { ThemedText } from "../themed-components/themed-text.component";

export const GameContainer: React.FC = () => {
  const coins = useAppSelector((state) => state.coins.value);
  // A different approach would be to have matrix in local state, but it's better to have it stored next to other values like numberOfSpins
  const { numberOfSpins, symbolMatrix } = useAppSelector((state) => state.game);

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
        <SlotMachine matrix={symbolMatrix} />
      </Box>
      <Box style={{ display: "flex", flex: 1 }}>
        {/* Another way would be to have this component handle all the logic and dispatching by having GameControls 
        have onWin and onRoll props but for the purpose of this test there won't be plenty more components so it's fine (won't be complex even like this) */}
        <GameControls currentCoins={coins} />
      </Box>
    </Box>
  );
};
