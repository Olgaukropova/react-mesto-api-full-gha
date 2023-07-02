import React from 'react';

function InfoTooltip({ isOpen, onclose, infoPopup }) {
  const className = `popup popup__infoTooltip ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__container">
        <button className="popup__button-close popup__button-close_delete" type="button" onClick={onclose}></button>
        <div className='popup__info'>
          <img className="popup__infoTooltip_image" src={infoPopup.image} alt="символ" />
          <p className="popup___infoTooltip_text">{infoPopup.text}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;