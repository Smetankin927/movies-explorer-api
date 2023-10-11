import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"; // импортируем Routes
import ProtectedRouteElement from "./ProtectedRoute";
import Header from "./Header";

import Main from "./Main";
import Registration from "./Registration";
import Login from "./Login";
import MoviesCardList from "./MoviesCardList";
import SavedMovieCardList from "./SavedMovieCardList";
import Account from "./Account";
import Menu from "./Menu";
import Footer from "./Footer";
import NotFound from "./NotFound";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isMenuOpen, toggleMenuClick] = React.useState(false);
  const [isHeaderVisible, toogleHeaderVisibility] = React.useState(true);

  const handleMenuClick = () => {
    if (!isMenuOpen) {
      toggleMenuClick(true);
    }
  };

  const handleCloseMenu = () => {
    if (isMenuOpen) {
      toggleMenuClick(false);
    }
  };

  return (
    <div className="page">
      <Header
        loggedIn={loggedIn}
        isHeaderVisible={isHeaderVisible}
        onMenuClick={handleMenuClick}
      />

      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<MoviesCardList />} />
        <Route path="/movies-saved" element={<SavedMovieCardList />} />
        <Route path="/profile" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
}

export default App;
