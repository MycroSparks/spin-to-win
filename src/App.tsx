import "./App.css";
import { Provider } from "react-redux";
import store from "./core/store/store";
import { Main } from "./common/main/main";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
          <Main />
        </header>
      </Provider>
    </div>
  );
}

export default App;
