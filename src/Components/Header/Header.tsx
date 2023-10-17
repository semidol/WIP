import style from './header.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
        <div className={[style.wrapper, "container"].join(' ')}>
            <div className={style.logo}>WIP</div>
            <menu className={style.menu}>
                <a href="#" className={style.menuItem}>Говно</a>
                <a href="#" className={style.menuItem}>Жопа</a>
                <a href="#" className={style.menuItem}>Член</a>
            </menu>
            <div className={style.avatar}>
                <img src="https://yt3.googleusercontent.com/ytc/AGIKgqM2v5lge2dzRU9Q9t963pwG4qkDvXvXEca0Hstk=s900-c-k-c0x00ffffff-no-rj" alt="аватар" />
            </div>
        </div>
    </header>
  )
}