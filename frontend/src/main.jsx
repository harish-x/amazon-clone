import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  for (const [key, value] of Object.entries(
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  )) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
      typeof value === "function" ? () => {} : null;
  }
}
if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined") {
  window.__REDUX_DEVTOOLS_EXTENSION__ = () => (next) => (action) =>
    next(action);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
