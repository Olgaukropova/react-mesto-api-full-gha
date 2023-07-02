import React from 'react';
import { CurrentUserContext } from '../../src/context/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__image-heart ${isLiked ? 'element__image-heart_active' : ''}`);

  return (
    <div className="element">
      <img className="element__image" src={props.card.link} alt={props.card.alt} onClick={props.onCardClick} />
      {isOwn && <button className="element__image-trash element__image-trash_button" type="button"
        onClick={props.onCardDelete}
      ></button>}
      <div className="element__content">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__image-container">
          <button className={cardLikeButtonClassName} type="button" onClick={props.onCardLike}></button>
          <p className="element__image-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card;