export const makeNewMatrix = (
  availableSymbols: string[],
  rows: number = 3,
  columns: number = 5
) => {
  return new Array(rows).fill(0).map(() =>
    Array(columns)
      .fill(0)
      .map(
        () =>
          availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
      )
  );
};

export const checkForWin = (matrix: string[][]) => {
  const rows = matrix.length;
  const rowConsecutiveSymbolAmount = new Array(matrix.length).fill(0);

  //This can be optimized in order to avoid O(n^2) (i*j actually but in practice same thing) complexity (turn matrix into a 15 element array and use logic up
  //until every 5th element with moduo), however, since it's a test, and also I can't imagine slot machine games having 1000+ rows and columns, so it's fine
  for (let i = 0; i < rows; i++) {
    const columns = matrix[i].length;
    let maxConsecutive = 0;
    let currentConsecutive = 0;
    for (let j = 0; j < columns - 1; j++) {
      if (matrix[i][j] === matrix[i][j + 1]) {
        currentConsecutive++;
        if (currentConsecutive > maxConsecutive) {
          maxConsecutive = currentConsecutive;
        }
      } else {
        currentConsecutive = 0;
      }
    }
    rowConsecutiveSymbolAmount[i] = maxConsecutive + 1;
  }

  return rowConsecutiveSymbolAmount.some((value) => value >= rows);
};
