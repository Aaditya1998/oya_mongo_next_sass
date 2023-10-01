import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md"; // Import the MdSecurity component correctly
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

export function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div> </div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <div className={styles.iconTextWrapper}>
              <img
                src="https://i.ibb.co/NLxL4Qj/Round-indian-flag-png.png"
                alt=""
              />
              <span>India / inr</span>
            </div>
          </li>
          <li className={styles.li}>
            <div className={styles.iconTextWrapper}>
              <MdSecurity />
              <span>Buyer Protection</span>
            </div>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <div className={styles.iconTextWrapper}>
              <BsSuitHeart />
              <Link href="/profile/wishlist">
                <span>Wishlist</span>
              </Link>
            </div>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <li className={styles.li}>
                <div className={`${styles.flex} ${styles.iconTextWrapper}`}>
                  <img src="https://i.ibb.co/HPczpxR/pngwing-com.png" alt="" />
                  <span>Aditya</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={`${styles.flex} ${styles.iconTextWrapper}`}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
