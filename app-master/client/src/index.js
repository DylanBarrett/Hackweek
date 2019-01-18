import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import "./index.css";
import App from "./components/App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducers, composeEnhancer, applyMiddleware(thunk));

// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
