import dolphin from "../../assets/compressed/dolphin.png";
import bandana from "../../assets/compressed/bandana.png";
import barrel from "../../assets/compressed/barrel.png";
import figurehead from "../../assets/compressed/figurehead.png";
import bomb from "../../assets/compressed/bomb.png";
import crowNest from "../../assets/compressed/crow-nest.png";
import island from "../../assets/compressed/island.png";
import oysterPearl from "../../assets/compressed/oyster-pearl.png";
import piranha from "../../assets/compressed/piranha.png";

export const symbolsInRowForWin = 3;

export const slotMachineRows = 3;

export const fillerSymbolAmount = 40;

export const symbolValues: Record<string, number> = {
  crowNest: 1,
  barrel: 1,
  bandana: 1,
  piranha: 2,
  bomb: 2,
  figurehead: 4,
  dolphin: 4,
  island: 8,
  oysterPearl: 20,
};

export const symbolImages: Record<string, string> = {
  dolphin: dolphin,
  bandana: bandana,
  bomb: bomb,
  piranha: piranha,
  crowNest: crowNest,
  oysterPearl: oysterPearl,
  barrel: barrel,
  figurehead: figurehead,
  island: island,
};
