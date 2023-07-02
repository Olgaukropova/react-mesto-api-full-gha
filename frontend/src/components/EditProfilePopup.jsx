import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../src/context/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      text="Сохранить"
      name="nameFormEdit">
      <input className="popup__field popup__field_data_name" id="field-name" type="text" name="name" value={name} minLength="2"
        maxLength="40" required onChange={handleNameChange} />
      <span className="popup__field-error field-name-error"></span>
      <input className="popup__field popup__field_data_job" id="field-job" type="text" name="job" minLength="2" value={description}
        maxLength="200" required onChange={handleDescriptionChange} />
      <span className="popup__field-error field-job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;