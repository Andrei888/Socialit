import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import history from "./utils/history";
import configureStore from "./configureStore";

const initialState = {};
export const store = configureStore(initialState, history);
const MOUNT_ROOT = document.getElementById("root")!;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_ROOT
);
