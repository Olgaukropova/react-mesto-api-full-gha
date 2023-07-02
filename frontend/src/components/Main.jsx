
import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../../src/context/CurrentUserContext.js';

function Main({ onAvatarPopup, onEditPopup, onAddProfile, handleCardClick,
  handleCardLike, cards, handleCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-icon" onClick={onAvatarPopup}>
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__top">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__button-pen" onClick={onEditPopup} type="button"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddProfile} type="button"></button>
      </section>
      <section className="elements">
        {
          cards.map((card, id) =>
          (<Card card={card}  key={card._id}  name={card.name} link={card.link} likes={card.likes.length}
            onCardClick={() => handleCardClick(card)} onCardLike={() => handleCardLike(card)}
            onCardDelete={() => handleCardDelete(card)}
          />))
        }
      </section>
    </main>
  )
};
export default Main;

