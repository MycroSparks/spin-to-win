import { Box } from "@mui/material";
import { ThemedText } from "../themed-components/themed-text.component";

interface Props {
  matrix: string[][];
}

export const SlotMachine: React.FC<Props> = ({ matrix }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
      }}
    >
      {matrix.map((row, i) => {
        return (
          <Box
            key={i}
            style={{
              display: "flex",
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
              minWidth: "50%",
            }}
          >
            {row.map((value, j) => {
              return (
                <Box
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "red",
                    minWidth: "19.8%",
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
