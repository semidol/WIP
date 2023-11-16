//Зарегистрировал, пока тестил: ftest1 - ftest1, ftset2 - ftset2ftset2A, ftest21 - ftset2ftset2A

import style from './registration.module.scss';
import { useRef, useState} from 'react'
import { useNavigate } from 'react-router';
import { useRegisterMutation } from '../../store/reducers/authApi';
import PATHS from '../../paths';
import Loader from '../Loader/Loader';
import { checkPass } from './helper';

interface Error {
	status?: number;
}

export default function Registration() {
	const loginRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const passRepeatRef = useRef<HTMLInputElement>(null);
	const [isLoginExist, setIsLoginExist] = useState(false); 
	const [wrongPass, setWrongPass] = useState<boolean | string>(false);
	const [isPassDif, setIsPassDif] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const navigate = useNavigate();
	const [register, { isLoading}] = useRegisterMutation();

	function inputHandler() { //check input changing
		setIsPassDif(false);
		setIsLoginExist(false);
		setIsPassDif(false);
		setWrongPass(false);
		if (loginRef.current?.value
				&& passRef.current?.value
				&& nameRef.current?.value 
				&& passRepeatRef.current?.value
				) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let dataSend = {
			login: loginRef.current?.value,
			password: passRef.current?.value,
			nickname: nameRef.current?.value
		}
		
		if (passRef.current?.value !== passRepeatRef.current?.value) {
			setIsPassDif(true);
			setIsFilled(false);
			if (passRepeatRef.current) {
				passRepeatRef.current.value = '';
			}
		} else if (checkPass(passRef.current?.value)) {
			setWrongPass(checkPass(passRef.current?.value))
			setIsFilled(false);
			if (passRef.current && passRepeatRef.current) {
				passRef.current.value = '';
				passRepeatRef.current.value = '';
			}
		} else {
			try {
				let result = await register(dataSend).unwrap();
				navigate(PATHS.chat)
	
				console.log(result)
			} catch (e) {
				if ((e as Error).status === 406) {
					setIsLoginExist(true);
					setIsFilled(false);
					if (loginRef.current) {
						loginRef.current.value = '';
					}
				}

				console.log(e);
			}
		}
	}

  return (
    <form onSubmit={isFilled ? submitHandler : undefined} className={style.form}>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="name">Имя</label>
				<input className={style.input} onChange={inputHandler} ref={nameRef} type="text" id='name' />
			</div>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="login">Логин</label>
				<input className={style.input} onChange={inputHandler} ref={loginRef} type="text" id='login' />
				{isLoginExist && <div className={style.error}>Данный логин уже существует</div>}
			</div>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="pass">Пароль</label>
				<input className={style.input} onChange={inputHandler} ref={passRef} type="password" id='pass' />
				{wrongPass && <div className={style.error}>{wrongPass}</div>}
			</div>
			<div className={style.labelInput}>
				<label className={style.label} htmlFor="passRepeat">Повторите пароль</label>
				<input className={style.input} onChange={inputHandler} ref={passRepeatRef} type="password" id='passRepeat' />
				{isPassDif && <div className={style.error}>Пароли не совпадают</div>}
			</div>
			<button className={isFilled ? style.btn : [style.btn, style.disabled].join(' ')} style={isLoading ? {color: 'transparent'} : undefined}>
				Зарегистрироваться
				{isLoading && <div className={style.loader}><Loader /></div>}
			</button>
    </form>
  )
}