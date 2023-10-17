import style from './chat.module.scss';

export default function Chat() {
  return (
    <main className={style.main}>
      <div className={["container", style.wrapper].join(' ')}>
        <div className={style.chat}>
          <div className={style.fieldMessage}></div>
          <div className={style.inputBlock}>
            <div contentEditable className={style.input}></div>
            <button className={style.btn}>Отправить</button>
          </div>
        </div>
      </div>
    </main>
  )
}