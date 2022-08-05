import { observer } from "mobx-react-lite";
import React from "react";
import {
  Route,
  Routes,
  Navigate,
  useRoutes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Contacts from "./pages/Contacts";
import AppRouter from "./router/AppRouter";
import { privateRoutes } from "./router/privateRoutes";
import { publicRoutes } from "./router/publicRoutes";
import user from "./store/user";
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
