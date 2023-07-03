import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../../src/context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute.jsx';
import * as auth from './../utils/auth.js';
import ok from './../image/ok.jpg';
import not from './../image/not.jpg';

function App() {
  const [openEditPopup, setEditOpenPopup] = React.useState(false);
  const [openAddPopup, setEditAddPopup] = React.useState(false);
  const [openAvatarPopup, setAvatarAddPopup] = React.useState(false);
  const [openInfoTooltip, setOpenInfoTooltip] = React.useState(false);
  const [infoPopup, setInfopopup] = React.useState({ text: '', image: '' });
  const [selectedCard, setSelectedCard] = React.useState({});
  const [openImage, setOpenImage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [emailUser, setEmailUser] = React.useState('');

  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setEmailUser(email);
        setCurrentUser(res.data);
        navigate('/', { replace: true });
      })

      .catch((err) => {
        handleInfoTooltip();
        setInfopopup({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: not });
        console.error(err);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then((data) => {
        if (data.error) {
          setInfopopup({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: not });
        } else {
          console.log('tut');
          setInfopopup({ text: 'Вы успешно зарегистрировались!', image: ok });
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        setInfopopup({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: not });
        console.error(err);
      })
      .finally(handleInfoTooltip);
  };

  //выход
  const handleSignOut = () => {
    auth
      .signout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
      })
      .catch(console.error);
  };

  const handleInfoTooltip = () => {
    setOpenInfoTooltip(true);
  };

  //* Проверка токена и авторизация пользователя
  React.useEffect(() => {
    auth
      .getContent()
      .then((res) => {
        setEmailUser(res.user.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        console.error(err);
      });
    
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData.reverse());
        setCurrentUser(userData.user);
      })
      .catch((err) => {
        console.error(err);
      });
    }    
  }, [loggedIn, navigate]);

  const handleEditProfileClick = () => {
    setEditOpenPopup(true);
  };
  const handleAddPlaceClick = () => {
    setEditAddPopup(true);
  };
  const handleEditAvatarClick = () => {
    setAvatarAddPopup(true);
  };
  const closeAllPopups = () => {
    setEditOpenPopup(false);
    setEditAddPopup(false);
    setAvatarAddPopup(false);
    setOpenImage(false);
    setOpenInfoTooltip(false);
    // setSelectedCard(card)
  };
  const handleCardClick = (card) => {
    setOpenImage(true);
    setSelectedCard(card);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard.card : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUpdateUser = (data) => {
    api
      .changeUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
        //  console.log(avatar)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      // console.log(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
  };
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((el) => el.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header
                  text='Выйти'
                  email={emailUser}
                  signOut={handleSignOut}
                />
                <ProtectedRoute
                  element={Main}
                  onEditPopup={handleEditProfileClick}
                  onAddProfile={handleAddPlaceClick}
                  onAvatarPopup={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
                <Footer />
              </>
            }
          />

          <Route
            path='/sign-up'
            element={
              <>
                <Header
                  text='Войти'
                  pass='/sign-in'
                />
                <Register onRegister={handleRegister} />
              </>
            }
          />

          <Route
            path='/sign-in'
            element={
              <>
                <Header
                  text='Регистрация'
                  pass='/sign-up'
                />
                <Login onLogin={handleLogin} />
              </>
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={openEditPopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={openAvatarPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={openAddPopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={openImage}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          onclose={closeAllPopups}
          isOpen={openInfoTooltip}
          infoPopup={infoPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
