import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./core/store/store";
import { Main } from "./common/main/main";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Main />
        </header>
      </Provider>
    </div>
  );
}

export default App;
