import styles from "./Features.module.css"

const Features = () => {

    // eslint-disable-next-line react/prop-types
    function IconTitleText({ icon, title, text }) {
        return (
            <div className={styles.feature}>
                <img 
                    src={icon} 
                    alt=""
                    aria-hidden="true" 
                    className={styles.icon}
                />
                <p className={styles.subtitle}>{title}</p>
                <p className={styles.description}>{text}</p>
            </div>
        );
    }

    return (
        <section className={styles.features}>
            <h2 className={styles.title}>We're different</h2>
            <div className={styles.wrapper}>
                <IconTitleText 
                    icon={"images/icon-snappy-process.svg"}
                    title={"Booking Cepat"}
                    text={
                        "Masyarakat dapat booking slot parkir dengan cepat dan mudah"
                    }
                />
                <IconTitleText 
                    icon={"images/icon-affordable-prices.svg"}
                    title={"Harga Terjangkau"}
                    text={
                        "EZPark jauh lebih murah daripada vallet konvensional, dan jauh lebih murah daripada membakar bahan bakar untuk menunggu mendapatkan slot parkir"
                    }
                />
                <IconTitleText 
                    icon={"images/icon-time.svg"}
                    title={"Efisiensi Waktu"}
                    text={
                        "EZpark membuat anda tidak perlu membuang waktu untuk mencari slot parkir yang kosong"
                    }
                />
            </div>
        </section>
    )
}

export default Features