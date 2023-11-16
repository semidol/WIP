import Chat from '../../Components/Chat/Chat';
import style from './chatpage.module.scss';

export default function Chatpage() {
  return (
    <main className={style.main}>
      <div className={["container", style.wrapper].join(' ')}>
        <div className={style.chat}>
          <Chat />
        </div>
      </div>
    </main>
  )
}