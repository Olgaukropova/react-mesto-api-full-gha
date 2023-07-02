import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      text="Сохранить"
      name="nameFormAvatar">
      <input ref={avatarRef} className="popup__field popup__field_data_avatar" id="field-avatar" type="url" name="avatar"
        placeholder="Ссылка на картинку" minLength="2" required />
      <span className="popup__field-error field-avatar-error"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;
