import React from 'react';
import {Link} from 'react-router-dom';


function Register({ onRegister }) {

  const [email, setEmail] = React.useState({ email: '' });
  const [password, setPassword] = React.useState({ password: '' });

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log('handleSubmit')
    console.log('email', email)
    console.log('password',password)
    e.preventDefault();

    onRegister({
      email,
      password
    });
  }

  return (
    <main className="main__form">
      <form className="form " onSubmit={handleSubmit} action="">
        <h2 className="form__header">Регистрация</h2>
        <input className="form__input" type="email" placeholder="Email" onChange={handleChangeEmail} value={email.email} />
        <input className="form__input" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password.password} minLength="3" maxLength="10" />
        <button className="form__button">Зарегистрироваться</button>
        <p className="form__text">Уже зарегистрированы? <Link className='form__text_link' to='/sign-in'>Войти</Link> </p>
      </form>
    </main>
  )
}

export default Register;