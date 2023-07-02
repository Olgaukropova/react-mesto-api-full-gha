import logo from './../image/logo.svg';
import {Link} from 'react-router-dom';

function Header({ text, email, pass, signOut }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className='header__info'>
        <p className='header__email'>{email}</p>
        
        <Link onClick={signOut} className="header__text" to={pass}>{text}</Link>
      </div>
    </header>
  );
}
export default Header;
