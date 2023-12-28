import { useMemo } from "react";
import { symbolImages, symbolValues } from "../../core/game/game.const";
import { getConsecutiveSymbolValue } from "../../core/game/game.util";

export const Paytable: React.FC = () => {
  const symbolsSortedByValue = useMemo(() => {
    return Object.keys(symbolValues)
      .map((symbolKey) => ({ symbolKey, value: symbolValues[symbolKey] }))
      .sort((a, b) => a.value - b.value);
  }, []);

  return (
    <>
      {/* Obviously this could be done dynamically (instead of hardcoding 4x divs), but for the test I'm not going to do all the little code optimizations */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>X</div>
        <div style={{ flex: 1 }}>3</div>
        <div style={{ flex: 1 }}>4</div>
        <div style={{ flex: 1 }}>5</div>
      </div>
      <div
        style={{
          flex: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {symbolsSortedByValue.map((symbol, index) => {
          return (
            <div
              key={index}
              style={{
                flex: 1,
              }}
            >
              <img
                src={symbolImages[symbol.symbolKey]}
                width={48}
                height={48}
              ></img>
              <div>{getConsecutiveSymbolValue(symbol.symbolKey, 3)}</div>
              <div>{getConsecutiveSymbolValue(symbol.symbolKey, 4)}</div>
              <div>{getConsecutiveSymbolValue(symbol.symbolKey, 5)}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
