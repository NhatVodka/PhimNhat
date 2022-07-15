import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: "",
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const google = new GoogleAuthProvider();
  const facebook = new FacebookAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        const { accessToken, displayName, photoURL, email } = result.user;
        const userGg = {
          accessToken: accessToken,
          username: displayName,
          profilePic: photoURL,
          email: email,
        };
        localStorage.setItem("user", JSON.stringify(userGg));
        if (userGg !== null) {
          state.user = userGg;
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebook)
      .then((result) => {
        const { accessToken, displayName, photoURL, email } = result.user;
        const userFb = {
          accessToken: accessToken,
          username: displayName,
          profilePic: photoURL,
          email: email,
        };
        localStorage.setItem("user", JSON.stringify(userFb));
        if (userFb !== null) {
          state.user = userFb;
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(state.error);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user, state.isFetching]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        signInWithGoogle,
        signInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
