import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

export function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.main}>
      <div className={`${styles.main__container} ${styles.iconTextWrapper}`}>
        <Link href="/" className={styles.logo}>
          <img src="../../../images/logo.png" alt="" />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
        </div>
        <div className={styles.search__icon}>
          <RiSearch2Line />
        </div>
        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>{cart.length}</span>
        </Link>
      </div>
    </div>
  );
}
