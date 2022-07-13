import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext/AuthContext";
import { MovieContextProvider } from "./contexts/movieContext/MovieContext";
import { CategoryContextProvider } from "./contexts/categoryContext/CategoryContext";
import { UserContextProvider } from "./contexts/userContext/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MovieContextProvider>
        <CategoryContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </CategoryContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
