import React from 'react';



function Login({ onLogin }) {

  const [email, setEmail] = React.useState({ email: '' });
  const [password, setPassword] = React.useState({ password: '' });

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email,
      password
    });
  }


  return (   
      <main className="main__form">
        <form className="form " action="" onSubmit={handleSubmit} >
          <h2 className="form__header">Вход</h2>
          <input className="form__input" type="email" placeholder="Email" onChange={handleChangeEmail} value={email.email}/>
          <input className="form__input" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password.password}/>
          <button className="form__button">Войти</button>
        </form>
      </main>   
  )
}
export default Login;