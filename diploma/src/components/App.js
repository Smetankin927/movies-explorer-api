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

import { api } from "../utils/Api";
import { apiMovies } from "../utils/MoviesApi";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as Auth from "../utils/Auth";

import Main from "./Main";
import Registration from "./Registration";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import MoviesCardList from "./MoviesCardList";
import SavedMovieCardList from "./SavedMovieCardList";
import Account from "./Account";
import Menu from "./Menu";
import Footer from "./Footer";
import NotFound from "./NotFound";

function App() {
  /****               Размеры окна screensize                          *****/

  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  function setDefaultNumberCards() {
    setScreenSize(getCurrentDimension());
    if (screenSize.width > 1180) {
      setNumberCards(16);
    } else if (screenSize.width <= 1180 && screenSize.width >= 750) {
      setNumberCards(8);
    } else if (screenSize.width < 750) {
      setNumberCards(5);
    }
  }

  React.useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    if (screenSize.width > 1180) {
      setnumberMoreCards(4);
    } else if (screenSize.width <= 1180 && screenSize.width >= 750) {
      setnumberMoreCards(2);
    } else if (screenSize.width < 750) {
      setnumberMoreCards(2);
    }
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  /****               остальная обработка                         *****/

  const [isPreloaderActive, setPreloaderActive] = React.useState(true);

  const [numberCards, setNumberCards] = React.useState(16);
  const [numberMoreCards, setnumberMoreCards] = React.useState(0);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuOpen, toggleMenuClick] = React.useState(false);
  const [isHeaderVisible, toogleHeaderVisibility] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState("");
  /*****            устанавливаем  email в  <Login />                      ******/
  const changeUserEmail = (mail) => {
    setUserEmail(mail);
  };
  /****               информационное окно                           *****/

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] =
    React.useState(false);
  const [tooltipMessages, setTooltipMessages] = React.useState({
    succesMessage: "",
    failMessage: "",
  });

  const closeAllPopups = () => {
    if (isInfoTooltipOpen) {
      setInfoTooltipOpen(false);
    }
  };

  function setIsInfoTooltipOpen(flag) {
    setInfoTooltipOpen(flag);
  }
  function setIsSuccessInfoTooltipStatus(flag) {
    setSuccessInfoTooltipStatus(flag);
  }
  /*****            кнопка меню                              ******/

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

  /******              работа с токеном                   ******/
  const navigate = useNavigate();
  const location = useLocation();

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          setUserEmail(data.email); //FIXME
          navigate(location.pathname);
        })
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        });
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);

  /******              подписка на контекст                   ******/
  const [currentUser, setCurrentUser] = React.useState({});
  /******               api для currentUser                      ******/

  React.useEffect(() => {
    if (loggedIn) {
      api
        .takeUserInfo()
        // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
    if (loggedIn) {
      initialFunction();
    }
    return () => {};
  }, [loggedIn]);
  /******              обновляем данные пользователя   <Account />               ******/

  function handleUpdateUser(data) {
    api
      .updateProfileInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        setIsSuccessInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setIsSuccessInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }
  /******              выход из аккаунта                   ******/

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("cards");
    localStorage.removeItem("filmSearch");
    //localStorage.removeItem("filmSearchSaved");
    localStorage.removeItem("numRender");
    localStorage.removeItem("toogle");
    //localStorage.removeItem("filmSaved");

    setCards([]);
    setCardsRender([]);
    setCardSaved([]);
    setCardsSavedRender([]);
    navigate("/signin");
  };
  /**************************************** РАБОТА С КАРТОЧКАМИ *******************************************/
  //стейт карточки
  const [cards, setCards] = React.useState([]);
  const [cardsRender, setCardsRender] = React.useState([]);
  const [cardsSavedRender, setCardsSavedRender] = React.useState([]);
  const [cardSaved, setCardSaved] = React.useState([]);

  /******               работа с localstorage начальный список сохраненных карточек и лайков     *******/
  const [valueToogle, setValueToogle] = React.useState(false); //for Toogre shortFilms фильмы
  const [valueToogleSaved, setValueToogleSaved] = React.useState(false); //for Toogre shortFilms фильмы сохраненные

  // React.useEffect(() => {
  //начальные значения окна
  const initialFunction = () => {
    setScreenSize(getCurrentDimension());
    //запрос к локальному для лайков
    apiMovies
      .getInitialCardsSaved()
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then((cardsData) => {
        console.log("CARDSDATA");
        console.log(cardsData);
        setCardSaved(cardsData);
        //console.log(cardSaved);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));

    //переключатель
    if (localStorage.getItem("toogle")) {
      setValueToogle(JSON.parse(localStorage.getItem("toogle")));
    }
    // выставляем поиск
    if (localStorage.getItem("filmSearch")) {
      hadleSearchFilms(localStorage.getItem("filmSearch"), valueToogle);
    }
    // выставляем  количество карточек
    //если есть в localstor о берем его
    if (localStorage.getItem("numRender")) {
      console.log("set number from localstor");
      setNumberCards(localStorage.getItem("numRender"));
    }
    //иначе берем дефолтные по ширине
    else if (!localStorage.getItem("numRender")) {
      setDefaultNumberCards();
      console.log(numberCards);
      console.log("props.numberCards1774");
    }
  };
  // }, []);

  /******               работа с localstorage начальный список карточек      *******/

  const hadleSearchFilms = (filmname, valueToogle) => {
    //выставляем дефолтное количество карточек по ширине
    setDefaultNumberCards();
    //смотрим, есть ли массив в localStorage
    //если нет -- получаем массив фильмов
    if (!localStorage.getItem("cards")) {
      if (loggedIn) {
        //запрос к внешней для начаьлного списка
        apiMovies
          .getInitialCards()
          // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
          .then((cardsData) => {
            //пополняем массив cards
            localStorage.setItem("cards", JSON.stringify(cardsData));
            setCards(cardsData);
            filterFilms(filmname);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      } else {
        //sconsole.log("Вфильмах");
        navigate("/signup");
      }
    } else if (localStorage.getItem("cards")) {
      setCards(JSON.parse(localStorage.getItem("cards")));
      filterFilms(filmname, valueToogle);
    }
  };
  //////////////////////////////////////////////////////////////////////////
  const hadleSearchSavedFilms = (filmname, valueToogle) => {
    //выставляем дефолтное количество карточек по ширине
    setDefaultNumberCards();
    filterSavedFilms(filmname, valueToogle);
  };

  /******               фильтрация список карточек          *******/
  const filterSavedFilms = (filmname, valueToogle) => {
    console.log("here");
    console.log(cardsSavedRender);
    if (valueToogle) {
      if (filmname) {
        let newCards = cardSaved.filter(function (item) {
          return (
            (item.nameRU
              .toLowerCase()
              .trim()
              .includes(filmname.toLowerCase().trim()) ||
              item.nameEN
                .toLowerCase()
                .trim()
                .includes(filmname.toLowerCase().trim())) &&
            item.duration < 60
          );
        });
        setCardsSavedRender(newCards);
        setPreloaderActive(false);
        console.log("here1");
        console.log(cardsSavedRender);
      } else {
        let newCards = cardSaved.filter(function (item) {
          return item.duration < 60;
        });
        setCardsSavedRender(newCards);
        setPreloaderActive(false);
        console.log("here2");
        console.log(cardsSavedRender);
      }
    } else {
      if (filmname) {
        let newCards = cardSaved.filter(function (item) {
          return (
            item.nameRU
              .toLowerCase()
              .trim()
              .includes(filmname.toLowerCase().trim()) ||
            item.nameEN
              .toLowerCase()
              .trim()
              .includes(filmname.toLowerCase().trim())
          );
        });
        setCardsSavedRender(newCards);
        setPreloaderActive(false);
        console.log("here3");
        console.log(cardsSavedRender);
      } else {
        console.log("here4");
        console.log(cardSaved);
        setCardsSavedRender(cardSaved);
        setPreloaderActive(false);
      }
    }
  };
  ////////////////////////////////////////////////////////////////////
  const filterFilms = (filmname, valueToogle) => {
    if (valueToogle) {
      if (localStorage.getItem("cards")) {
        let newCards = JSON.parse(localStorage.getItem("cards")).filter(
          function (item) {
            return (
              (item.nameRU
                .toLowerCase()
                .trim()
                .includes(filmname.toLowerCase().trim()) ||
                item.nameEN
                  .toLowerCase()
                  .trim()
                  .includes(filmname.toLowerCase().trim())) &&
              item.duration < 60
            );
          }
        );
        setCardsRender(newCards);
        setPreloaderActive(false);
      }
    } else {
      if (localStorage.getItem("cards")) {
        let newCards = JSON.parse(localStorage.getItem("cards")).filter(
          function (item) {
            return (
              item.nameRU
                .toLowerCase()
                .trim()
                .includes(filmname.toLowerCase().trim()) ||
              item.nameEN
                .toLowerCase()
                .trim()
                .includes(filmname.toLowerCase().trim())
            );
          }
        );
        setCardsRender(newCards);
        setPreloaderActive(false);
      }
    }
  };

  /******               отслеживаем изменение чекбокса          *******/
  React.useEffect(() => {
    if (location.pathname !== "/movies-saved") {
      setCardsSavedRender(cardSaved);
      setValueToogleSaved(false);
    }
  }, [location.pathname]);

  /******               отслеживаем изменение чекбокса          *******/
  React.useEffect(() => {
    filterFilms(localStorage.getItem("filmSearch"), valueToogle);
  }, [valueToogle]);

  React.useEffect(() => {
    filterSavedFilms(localStorage.getItem("filmSearchSaved"), valueToogleSaved);
    //filterToogleSaved(valueToogleSaved);
  }, [valueToogleSaved]);
  /******               отслеживаем изменение сохраненных карточек          *******/
  React.useEffect(() => {
    console.log("cardSAved in hhok");
    console.log(cardSaved);
    setCardsSavedRender(cardSaved);
  }, [cardSaved]);
  /******               лайк карточек    пробрасываем в Card через MovieList      *******/
  function handleCardDelete(id) {
    apiMovies
      .deleteCard(id)
      .then((cardRemove) => {
        setCardSaved(cardSaved.filter((c) => c.id !== cardRemove.id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const handleCardLike = (card, isLiked, setIsLiked) => {
    //если есть -- удаляем
    if (isLiked) {
      handleCardDelete(card.id);
      setIsLiked(false);
    } else {
      const newCard = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailer: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${card.image.previewUrl}`,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        movieId: card.id,
      };
      apiMovies
        .postNewCard(newCard)
        .then((item) => {
          setCardSaved([...cardSaved, item]);
          console.log("cardsSaved");
          console.log(cardSaved);
          setIsLiked(true);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  };

  /******               return                      *******/
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          isHeaderVisible={isHeaderVisible}
          onMenuClick={handleMenuClick}
        />

        <Routes>
          <Route
            path="/signup"
            element={
              <Registration
                setTooltipMessages={setTooltipMessages}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={() => {
                  setLoggedIn(true);
                }}
                setUserEmail={changeUserEmail}
                setTooltipMessages={setTooltipMessages}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
              />
            }
          />
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={MoviesCardList}
                setPreloaderActive={setPreloaderActive}
                isPreloaderActive={isPreloaderActive}
                saved={cardSaved}
                onLikeCard={handleCardLike}
                handleCardDelete={handleCardDelete}
                cards={cardsRender}
                loggedIn={loggedIn}
                hadleSearchFilms={hadleSearchFilms} //для проброса в search
                isOn={valueToogle} //для проброса в search
                setValue={setValueToogle} //для проброса в search
                setNumberCards={setNumberCards}
                numberCards={numberCards} //для кнопки еще
                numberMoreCards={numberMoreCards} //для кнопки еще
              />
            }
          />
          <Route
            path="/movies-saved"
            element={
              <ProtectedRouteElement
                element={SavedMovieCardList}
                setPreloaderActive={setPreloaderActive}
                isPreloaderActive={isPreloaderActive}
                saved={cardSaved}
                onLikeCard={handleCardLike}
                handleCardDelete={handleCardDelete}
                cards={cardsSavedRender}
                loggedIn={loggedIn}
                hadleSearchFilms={hadleSearchSavedFilms} //для проброса в search
                isOn={valueToogleSaved} //для проброса в search
                setValue={setValueToogleSaved} //для проброса в search
                setNumberCards={setNumberCards}
                numberCards={numberCards} //для кнопки еще
                numberMoreCards={numberMoreCards} //для кнопки еще
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Account}
                onUpdateUser={handleUpdateUser}
                handleSignOut={handleSignOut}
                loggedIn={loggedIn}
                setTooltipMessages={setTooltipMessages}
                // setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                // setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSucces={isSuccessInfoTooltipStatus}
          tooltipMessages={tooltipMessages}
          onClose={closeAllPopups}
        />
        <Footer />
        <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        <script type="module" src="./index.js"></script>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
