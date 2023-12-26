const symbolsInRowForWin = 3;

export const symbolHierarchy: Record<number, string[]> = {
  0: ["10", "Q", "J"],
  1: ["A", "K"],
  2: ["T"],
  3: ["Y", "Z"],
  4: ["WOW"],
  5: ["SMILE"],
};

export const getAvailableSymbols = () => {
  const availableSymbols: string[] = new Array(0).concat(
    Object.values(symbolHierarchy).flat(Infinity)
  );
  return availableSymbols;
};

export const makeNewMatrix = (
  forceWin?: boolean,
  rows: number = 3,
  columns: number = 5
): string[][] => {
  const availableSymbols = getAvailableSymbols();
  const preRolledSymbol =
    availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
  const winningRow: string[] | null = forceWin
    ? new Array(columns).fill(0).map((_value, index) => {
        return index < symbolsInRowForWin
          ? preRolledSymbol
          : availableSymbols[
              Math.floor(Math.random() * availableSymbols.length)
            ];
      })
    : null;

  const newMatrix = new Array(rows).fill(0).map(() =>
    Array(columns)
      .fill(0)
      .map(
        () =>
          availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
      )
  );

  if (winningRow) {
    newMatrix[Math.floor(Math.random() * rows)] = winningRow;
  }

  return newMatrix;
};

export const symbolValues: Record<string, number> = {
  "10": 1,
  Q: 1,
  J: 1,
  A: 1.5,
  K: 1.5,
  T: 3,
  Y: 3,
  Z: 3,
  WOW: 7,
  SMILE: 20,
};

export const getGameResult = (matrix: string[][], betAmount: number) => {
  const rows = matrix.length;
  if (!rows) {
    return 0;
  }
  const columns = matrix[0].length;
  if (!columns) {
    return 0;
  }
  const rowConsecutiveSymbol: Record<string, number> = {};

  //This can be optimized in order to avoid O(n^2) (i*j actually but in practice same thing) complexity (turn matrix into a 15 element array and use logic up
  //until every 5th element with moduo), however, since it's a test, and also I can't imagine slot machine games having 1000+ rows and columns, so it's fine
  for (let i = 0; i < rows; i++) {
    let maxConsecutiveSymbol: { type: string; amount: number } = {
      type: "/",
      amount: 0,
    };
    let currentConsecutive = 0;
    for (let j = 0; j < columns - 1; j++) {
      if (matrix[i][j] === matrix[i][j + 1]) {
        currentConsecutive++;
        if (currentConsecutive > maxConsecutiveSymbol.amount) {
          maxConsecutiveSymbol.amount = currentConsecutive;
          maxConsecutiveSymbol.type = matrix[i][j];
        }
      } else {
        currentConsecutive = 0;
      }
    }
    rowConsecutiveSymbol[maxConsecutiveSymbol.type] =
      maxConsecutiveSymbol.amount + 1;
  }

  let winnings = 0;

  //TODO: Add different values from PayoutTable
  for (const symbol in rowConsecutiveSymbol) {
    if (rowConsecutiveSymbol[symbol] >= 3) {
      // Basic exponential reward system - more symbols in a row = exponentially higher payout multiplier. (Maybe we want a nlogn function instead
      // but for the sake of the test this should be fine)
      const multiplier = Math.pow(rowConsecutiveSymbol[symbol] - 2, 2);
      winnings += 5 * multiplier * symbolValues[symbol] * betAmount;
    }
  }

  return Math.ceil(winnings);
};
