import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from 'react-redux';
import store from './state/redux/store/store';
// import { BrowserRouter } from 'react-router-dom';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);
