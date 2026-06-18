import RootLayout from "./containers/RootLayout";
import ErrorPage from "./containers/ErrorPage";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useCallback, useState } from "react";
import { AuthContext } from "../context/app-context.js";
import SymbolList from "./symbolList/SymbolList.jsx";
import Login from "./login/Login.jsx";
import LoggedOut from "./loggedOut/LoggedOut.jsx"

const routerLoggedIn = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <SymbolList /> },
      { path: "symbols", element: <SymbolList /> },
      { path: "login", element: <Navigate to="symbols" replace /> },
      { path: "bimbimbambam", element: <Navigate to="symbols" replace /> }
    ],
  },
]);

const routerLoggedOut = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to="login" replace /> },
      { path: "symbols", element: <Navigate to="bimbimbambam" replace /> },
      { path: "login", element: <Login /> },
      { path: "bimbimbambam", element: <LoggedOut /> }
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedIsLoggedIn === "true" ? true : false,
  );

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    console.log("connecté!!")
  }, []);
  const logout = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    console.log("déconnecté!!")
  }, []);

  if (token !== null) {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={routerLoggedIn} />
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          token: null,
          userId: null,
          login: login,
        }}
      >
        <RouterProvider router={routerLoggedOut} />
      </AuthContext.Provider>
    );
  }
};

export default App;
