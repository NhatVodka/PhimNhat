import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import { AuthContext } from "./contexts/authContext/AuthContext";
import Category from "./pages/Admin/Category";
import CategoryList from "./pages/Admin/CategoryList";
import Home from "./pages/Admin/Home";
import Movie from "./pages/Admin/Movie";
import MovieList from "./pages/Admin/MovieList";
import NewCategory from "./pages/Admin/NewCategory";
import NewMovie from "./pages/Admin/NewMovie";
import NewUser from "./pages/Admin/NewUser";
import User from "./pages/Admin/User";
import UserList from "./pages/Admin/UserList";
import CategoryPage from "./pages/Category/CategoryPage";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login/Login";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import NotAllowedPage from "./pages/NotAllowedPage/NotAllowedPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";
import SearchPage from "./pages/Search/SearchPage";
import WatchMovie from "./pages/WatchMoviePage/WatchMovie";

function App() {
  const { user } = useContext(AuthContext);

  const checkUser = (Component) => {
    return !user ? <NotAllowedPage /> : <Component />;
  };
  const checkAdmin = (Component) => {
    return !user || !user.isAdmin ? <NotAllowedPage /> : <Component />;
  };

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Main />}>
          <Route path="/movies" element={checkUser(MoviePage)}></Route>
          <Route path="/search" element={checkUser(SearchPage)}></Route>
          <Route path="/category" element={checkUser(CategoryPage)}></Route>
          <Route
            path="/detail/:id"
            element={checkUser(MovieDetailPage)}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
        <Route path="/watch/:id" element={checkUser(WatchMovie)}></Route>
        <Route path="/dashboard">
          <Route index element={checkAdmin(Home)}></Route>
        </Route>
        <Route path="usersAdmin">
          <Route index element={checkAdmin(UserList)}></Route>
          <Route path=":userId" element={checkAdmin(User)}></Route>
        </Route>
        <Route path="newuser" element={checkAdmin(NewUser)}></Route>
        <Route path="moviesAdmin">
          <Route index element={checkAdmin(MovieList)}></Route>
          <Route path=":movieId" element={checkAdmin(Movie)}></Route>
        </Route>
        <Route path="newmovie" element={checkAdmin(NewMovie)}></Route>
        <Route path="categoryAdmin">
          <Route index element={checkAdmin(CategoryList)}></Route>
          <Route path=":categoryId" element={checkAdmin(Category)}></Route>
        </Route>
        <Route path="newcategory" element={checkAdmin(NewCategory)}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
