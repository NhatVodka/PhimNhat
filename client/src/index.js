import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext/AuthContext";
import { MovieContextProvider } from "./contexts/movieContext/MovieContext";
import { CategoryContextProvider } from "./contexts/categoryContext/CategoryContext";
import { UserContextProvider } from "./contexts/userContext/UserContext";
import { CommentContextProvider } from "./contexts/commentContext/CommentContext";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieContextProvider>
          <CategoryContextProvider>
            <UserContextProvider>
              <CommentContextProvider>
                <App />
              </CommentContextProvider>
            </UserContextProvider>
          </CategoryContextProvider>
        </MovieContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </RecoilRoot>
);
