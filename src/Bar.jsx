import Nav from "./Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Bar.module.css";

const Bar = () => {
    const [icon, setIcon] = useState('/images/icon-hamburger.svg'); // Path langsung
    const navigate = useNavigate();

    function handleClick(e) {
        const isHamburger = e.target.getAttribute("src").includes("hamburger");
        setIcon(isHamburger ? '/images/icon-close.svg' : '/images/icon-hamburger.svg'); // Path langsung
        document.querySelector("nav").classList.toggle(styles.open);
        document.body.classList.toggle("lockScroll");
    }

    const handleError = (e) => {
        e.target.src = '/images/placeholder-image.svg'; // Ganti dengan path ke gambar placeholder yang ada di public
    };

    return (
        <div className={styles.top_bar}>
            <button 
                className={styles.logo_btn} 
                onClick={() => navigate("/")}>
                <img 
                    src="/images/logo.png" // Path langsung ke gambar logo
                    alt="EZPark logo"
                    className={styles.logo_img}
                    onError={handleError} // Menangani error gambar
                />
            </button>
            <button className={styles.menu_btn} onClick={(e) => handleClick(e)}>
                <img 
                    src={icon}
                    alt="hamburger icon"
                    onError={handleError} // Menangani error gambar
                />
            </button>
            <Nav />
        </div>
    );
};

export default Bar;
