import { useDispatch } from 'react-redux';
import style from './login.module.scss';
import {useRef, useState} from 'react'
import { authorize, store } from '../../store';
import { useNavigate } from 'react-router';

export default function Login() {
	const dispatch = useDispatch();
	const loginRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [isFilled, setIsFilled] = useState(false);
	const navigate = useNavigate();

	function inputHandler() {
		if (loginRef.current?.value && passRef.current?.value) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let url = 'https://api.plnx.ru/login';
		let dataSend = {
			login: loginRef.current?.value,
			password: passRef.current?.value
		}

		try {
			let responce = await fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataSend)
			})
			let result = await responce.json();

			if (result.authorized === 'True') {
				dispatch(authorize({
					isAuth: result.authorized,
					session: result.session,
					statsId: result.stats_id,
					userId: result.user_id,
				}))
				navigate('/chat')
			} else {
				alert('что-то ты попутал, братик')
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
    <main className={style.main}>
      <div className={["container", style.wrapper].join(' ')}>
        <form onSubmit={isFilled ? submitHandler : undefined} className={style.form}>
          <div className={style.labelInput}>
            <label className={style.label} htmlFor="login">Логин</label>
            <input className={style.input} onChange={inputHandler} ref={loginRef} type="text" id='login' />
          </div>
          <div className={style.labelInput}>
            <label className={style.label} htmlFor="pass">Пароль</label>
            <input className={style.input} onChange={inputHandler} ref={passRef} type="password" id='pass' />
          </div>
          <button type='submit' className={isFilled ? style.btn : [style.btn, style.disabled].join(' ')}>Войти</button>
        </form>
      </div>
    </main>
	)
}