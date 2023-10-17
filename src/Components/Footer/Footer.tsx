import style from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
        <div className={["container", style.wrapper].join(' ')}>
          footer
        </div>
    </footer>
  )
}