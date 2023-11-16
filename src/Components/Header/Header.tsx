import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import style from './header.module.scss';
import PATHS from '../../paths';
import { useLogOutMutation } from '../../store/reducers/authApi';
import Loader from '../Loader/Loader';

export default function Header() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const userId = useAppSelector(state => state.user.userId);
  const [logOut, {isLoading}] = useLogOutMutation();

  async function btnLogoutHandler() {
    const dataSend = {
      user: userId,
    }

    try {
      let result = await logOut(dataSend).unwrap();
      console.log(result)
    } catch (error) {
      console.error();
    }
  }

  return (
    <header className={style.header}>
        <div className={[style.wrapper, "container"].join(' ')}>
            <div className={style.logo}>WIP</div>
            <menu className={style.menu}>
                <Link to={PATHS.main} className={style.menuItem}>Главная</Link>
                <Link to={PATHS.chat} className={style.menuItem}>Чат</Link>
                <a href="#" className={style.menuItem}>ссылка 2</a>
            </menu>
            {isAuth ?
            <div className={style.user}>
              <button onClick={btnLogoutHandler} className={style.logOut} style={isLoading ? {color: 'transparent'} : undefined}>
                Выйти
                {isLoading && <div className={style.loader}><Loader /></div>}
              </button>
            </div>
            :
            <div>
              <Link to={PATHS.login}>
                <button className={style.logIn}>Войти или зарегистрироваться</button>
              </Link>
            </div>}
        </div>
    </header>
  )
}