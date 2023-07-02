import React from 'react';

function ImagePopup(props) {

  const className = `popup popup_foto ${props.isOpen ? 'popup_opened' : ''}`;
  //  console.log(className)
  return (
    <div className={className} style={{ zIndex: 3 }}>
      <div className="popup__content">
        <button className="popup__button-close popup__button-close_foto" type="button" onClick={props.onClose} ></button>
        <img className="popup__image popup__image_data"
          src={props.card.link}
          alt={props.card.alt} />
        <h2 className="popup__label popup__label_data">
          {props.card.name}
        </h2>
      </div>
    </div>
  )
}

export default ImagePopup;