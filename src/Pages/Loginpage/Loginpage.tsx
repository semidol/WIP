import style from './loginpage.module.scss';
import { useState} from 'react'
import Login from '../../Components/Login/Login';
import Registration from '../../Components/Registration/Registration';

export default function Loginpage() {
	const [isLogin, setIsLogin] = useState(true);

	function chooseLogReg() {
		setIsLogin(!isLogin);
	}

	return (
    <main className={style.main}>
      <div className={["container", style.wrapper].join(' ')}>
				<div className={style.loginReg}>
					<div
						className={isLogin ? [style.loginRegItem, style.active].join(' ') : style.loginRegItem}
						onClick={isLogin ? undefined : chooseLogReg}
					>
						Войти
					</div>
					<div 
						className={isLogin ? style.loginRegItem : [style.loginRegItem, style.active].join(' ')}
						onClick={isLogin ? chooseLogReg : undefined}
					>
						Зарегистрироваться
					</div>
				</div>
        {isLogin ?
				<div className={style.login}>
					<Login />
				</div>
				:		
				<div className={style.registration}>
					<Registration />	
				</div>}
      </div>
    </main>
	)
}