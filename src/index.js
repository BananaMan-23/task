import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './Index.css'
import { Provider } from "react-redux";
import store from "./Redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
