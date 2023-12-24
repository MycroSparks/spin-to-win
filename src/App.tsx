import { Provider } from "react-redux";
import store from "./core/store/store";
import { GameContainer } from "./common/game/game.container";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "./core/theme/theme.constant";

function App() {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <Box
        style={{
          minHeight: "100vh",
          display: "flex",
          fontSize: "calc(10px + 2vmin)",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Provider store={store}>
          <GameContainer />
        </Provider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
