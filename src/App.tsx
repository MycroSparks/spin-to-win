import { Provider } from "react-redux";
import store from "./core/store/store";
import { GameContainer } from "./common/game/game.container";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontSize: "calc(10px + 2vmin)",
        textAlign: "center",
        width: "100vw",
      }}
    >
      <Provider store={store}>
        <GameContainer />
      </Provider>
    </div>
  );
}

export default App;
