import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";

const Nav = () => {
    const options = [
        { id: 0, text: "Cek Parkir", path: "/cek-parkir" },
        { id: 1, text: "EZpoin", path: "#" },
        { id: 2, text: "EZPay", path: "#" }
    ];

    const listOptions = options.map((option) => (
        <li key={option.id}>
            <Link to={option.path} className={styles.option}>{option.text}</Link>
        </li>
    ));

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {listOptions}
            </ul>
            <button className={styles.view_plans_btn_bar}>Login/Register</button>
        </nav>
    );
};

export default Nav;
