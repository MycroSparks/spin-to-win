import { Box } from "@mui/material";
import { ThemedText } from "../themed-components/themed-text.component";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slotMachineRows } from "../../core/game/game.const";
import { getAvailableSymbols } from "../../core/game/game.util";

interface Props {
  matrix: string[][];
}

export const SlotMachine: React.FC<Props> = ({ matrix }) => {
  const [elementDetails, setElementDetails] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const ref = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (ref.current) {
      setElementDetails({
        height: ref.current[0].clientHeight,
        width: ref.current[0].clientWidth,
      });
    }
  }, []);
  console.log("scrollHeight: " + ref.current[0]?.scrollHeight ?? 0);
  console.log("scrollTop:" + ref.current[0]?.scrollTop ?? 0);

  useEffect(() => {
    const intervals: NodeJS.Timer[] = [];
    for (let i = 0; i < 5; i++) {
      intervals[i] = setInterval(() => {
        ref.current[i].scrollBy({ top: 20 });
        const bottom =
          ref.current[i].scrollHeight - ref.current[i].scrollTop ===
          ref.current[i].clientHeight;
        console.log(i + ": " + bottom);
        if (bottom) {
          clearInterval(intervals[i]);
        }
      }, 50);
    }
    return () => {
      for (const interval in intervals) {
        clearInterval(interval);
      }
    };
  }, [ref]);

  const transposed = useMemo(
    () => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex])),
    [matrix]
  );

  const fillerSymbols = useCallback(() => {
    const availableSymbols = getAvailableSymbols();
    return new Array(10)
      .fill(0)
      .map(
        () =>
          availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
      );
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        height: 500,
      }}
    >
      {transposed.map((row, i) => {
        return (
          <Box
            ref={(el: HTMLDivElement) => (ref.current[i] = el)}
            key={i}
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            {row.map((value, j) => {
              return (
                <Box
                  key={j}
                  style={{
                    display: "flex",
                    height: elementDetails.height / slotMachineRows - 4, // the 4 comes from borders (2width * 2(bottom and top) = 4)
                    alignItems: "center",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "red",
                    minWidth: "19.7%",
                  }}
                >
                  <ThemedText style={{ flex: 1 }} variant={"h4"}>
                    {value}
                  </ThemedText>
                </Box>
              );
            })}
            {fillerSymbols().map((value, j) => {
              return (
                <Box
                  key={j}
                  style={{
                    display: "flex",
                    height: elementDetails.height / slotMachineRows - 4, // the 4 comes from borders (2width * 2(bottom and top) = 4)
                    alignItems: "center",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "red",
                    minWidth: "19.7%",
                  }}
                >
                  <ThemedText style={{ flex: 1 }} variant={"h4"}>
                    {value}
                  </ThemedText>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
