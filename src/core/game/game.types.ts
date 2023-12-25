export interface GameStateType {
  numberOfSpins: number;
  symbolMatrix: string[][];
  spinResult: "Win" | "Loss" | null;
}
