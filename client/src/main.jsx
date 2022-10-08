import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Loading from "./components/UI/Loading";
import { Provider } from "react-redux";
import { store } from "../src/store/index";
import axios from "axios";
import { AuthContextProvider } from "./firebase/context";

axios.defaults.baseURL =
  import.meta.env.VITE_APP_API || "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <>
          <Loading />
        </>
      }
    >
      <Provider store={store}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);