import React, { useState, useEffect } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";

export default function CircledIconBtn({ type, text }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Add any other click event logic here if needed
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      // Adjust the breakpoint as needed for mobile screens
      const timeout = setTimeout(() => {
        handleClick();
      }, 2000); // Adjust the timeout duration as needed
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <button
      className={`${styles.button} ${clicked ? styles.clicked : ""}`}
      type={type}
      onClick={handleClick}
    >
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
      {text}
    </button>
  );
}
