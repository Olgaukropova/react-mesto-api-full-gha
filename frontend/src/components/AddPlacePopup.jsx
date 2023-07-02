import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      text="Создать"
      name="nameFormAdd">
      <input className="popup__field popup__field_data_title" id="field-title" type="text" name="title"
        placeholder="Название" minLength="2" maxLength="30" required value={title} onChange={handleTitleChange} />
      <span className="popup__field-error field-title-error"></span>
      <input className="popup__field popup__field_data_link" id="field-link" name="link" placeholder="Ссылка на картинку"
        type="url" required value={link} onChange={handleLinkChange} />
      <span className="popup__field-error field-link-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;