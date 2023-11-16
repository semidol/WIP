import style from './login.module.scss';
import { useRef, useState} from 'react'
import { useNavigate } from 'react-router';
import { useLogInMutation } from '../../store/reducers/authApi';
import PATHS from '../../paths';
import Loader from '../Loader/Loader';

export default function Login() {
	const loginRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [isFilled, setIsFilled] = useState(false);
	const [isErrorLogIn, setIsErrorLogIn] = useState(false)
	const navigate = useNavigate();
	const [logIn, {isError, isLoading}] = useLogInMutation();

	function inputHandler() { //check input changing
		setIsErrorLogIn(false)
		if (loginRef.current?.value && passRef.current?.value) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let dataSend = {
			login: loginRef.current?.value,
			password: passRef.current?.value
		}

		try {
			let result = await logIn(dataSend).unwrap();
			navigate(PATHS.chat)

			console.log(result)
		} catch (e) {
			setIsErrorLogIn(true);
			setIsFilled(false)
			if (passRef.current) {
				passRef.current.value = '';
			}

			console.log(e);
		}
	}

  return (
    <form onSubmit={isFilled ? submitHandler : undefined} className={style.form}>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="login">Логин</label>
				<input className={style.input} onChange={inputHandler} ref={loginRef} type="text" id='login' />
			</div>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="pass">Пароль</label>
				<input className={style.input} onChange={inputHandler} ref={passRef} type="password" id='pass' />
				{isErrorLogIn && isError && <div className={style.error}>Ошибка авторизации</div>}
			</div>
			<button className={isFilled ? style.btn : [style.btn, style.disabled].join(' ')} style={isLoading ? {color: 'transparent'} : undefined}>
				Войти
				{isLoading && <div className={style.loader}><Loader /></div>}
			</button>
    </form>
  )
}