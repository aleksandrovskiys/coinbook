import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "src/App";
import { store } from "src/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
