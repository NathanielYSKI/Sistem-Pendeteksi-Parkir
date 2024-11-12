import styles from "./Intro.module.css";

const Intro = () => {
    return (
        <div className={styles.intro}>
            <picture className={styles.intro_img}>
            <source 
                srcSet="https://cdn.arrowstreet.com/wp-content/uploads/2017/06/19220413/Arrowstreet_PVD_Place_40-1400x905.jpg"
                media="(min-width: 1024px)"/>
            <img 
                src="https://cdn.arrowstreet.com/wp-content/uploads/2017/06/19220413/Arrowstreet_PVD_Place_40-1400x905.jpg"
                alt=""
                aria-hidden="true" />
            </picture>
            <div className={styles.intro_content}>
            <h1 className={styles.title}>Parking So Eazy</h1>
            <p className={styles.description}>
                Lama menunggu parkiran penuh? Waktu habis cuma karena menunggu parkiran?
                Kenalin nih <b>EZPark</b> sistem yang bisa memantau dan booking
                slot parkiran mall-mall besar di Indonesia
            </p>
            </div>
        </div>
    )
}

export default Intro