import { observer } from "mobx-react-lite";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import user from "../store/user";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

const AppRouter = () => {
  return (
    <Routes>
      {user._isAuth ? (
        <>
          {privateRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </>
      )}
    </Routes>
  );
};

export default observer(AppRouter);
