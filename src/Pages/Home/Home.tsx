import Chat from '../../Components/Chat/Chat'
import style from './home.module.scss'

export default function Home() {
  return (
    <main className={style.main}>
      <div className={["container", style.wrapper].join(' ')}>
        <h1 className={style.heading}>Самые сочные нейросети здесь</h1>
        <div className={style.chat}>
          <Chat />
        </div>
      </div>
    </main>
  )
}