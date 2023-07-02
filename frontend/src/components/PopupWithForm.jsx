import React from 'react';
function PopupWithForm(props) {
  const className = `popup popup_form-${props.name} ${props.isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form popup__formEdit" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button-submit " type="submit" >{props.text}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

