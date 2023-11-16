import { useLocation } from 'react-router';
import style from './chat.module.scss';
import {useState, useRef, useEffect} from 'react';
import { url } from '../../store/url';
import { useAppSelector } from '../../hooks';

type TMessages = {
  text: string | undefined,
  isUser: boolean
}

export default function Chat() {
  const location = useLocation();
  const session = useAppSelector(state => state.user.session);
  const chatId = useAppSelector(state => state.user.chatId);
  const inputRef = useRef<HTMLDivElement>(null);
  const fieldMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessages[]>([]);
  
  async function enterMessage() {
    if (inputRef.current?.innerText.trim() !== '' && inputRef.current) {
      let text = inputRef.current.innerText.trim();
      // let dataSend = {
      //   role: 'user',
      //   content: 'Стоит ли выпить пивка?'
      // }

      // try {
      //   let responce = await fetch(url + '/save/' + chatId,{
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     method: 'POST',
      //     body: JSON.stringify(dataSend)
      //   })
      //   let result = await responce.json()
      //   console.log(result)
      //   try {
      //     let dataSend = {
      //       'chat-id': chatId,
      //     }
      //     let responce = await fetch(url + 'generate',{
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Session-id': session,
      //         'type': 'allowed_to_generate_text'
      //       },
      //       method: 'POST',
      //       body: JSON.stringify(dataSend)
      //     })
      //     let result = await responce.json()
      //     console.log(result)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
      setMessages((messages) => [
        ...messages,
        {text: text, isUser: true}
      ])
      inputRef.current.innerHTML = '';

      setMessages((messages) => [
        ...messages,
        {text: 'Возникли проблемки', isUser: false}
      ])
    }
  }

  useEffect(() => {
    if (fieldMessageRef.current) {
      fieldMessageRef.current.scrollTop = 1e9;
    }
  }, [messages])

  function keyEnterHandler (e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Enter') {
      e.preventDefault();
      enterMessage();
    }
  }

  return (
   <div className={style.chat}>
      <div className={style.fieldMessage} ref={fieldMessageRef}>
        {location.pathname === '/' && <div className={[style.appMessage, style.message].join(' ')}>Че хочешь, брат?</div>}
        {messages.map((item, index) => (
          <div key={index} className={[item.isUser ? style.userMessage : style.appMessage, style.message].join(' ')}>
            {item.text}
          </div>
        ))}
      </div>
        <div className={style.inputBlock}>
          <div ref={inputRef} onKeyDown={keyEnterHandler} contentEditable data-placeholder='Сообщение' className={style.input}></div>
          <button className={style.btn} onClick={enterMessage}>Отправить</button>
        </div>
    </div>
  )
}