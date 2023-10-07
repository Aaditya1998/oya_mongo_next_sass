import React, { useState, useRef } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";

export default function CircledIconBtn({ type, text }) {
  const [clicked, setClicked] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const svgWrapRef = useRef(null);
  const buttonRef = useRef(null); // Define a ref for the button element

  const handleTouchStart = (e) => {
    setIsSliding(true);
  };

  const handleTouchMove = (e) => {
    if (isSliding) {
      const svgWrap = svgWrapRef.current;
      const touch = e.touches[0];
      const clientX = touch.clientX;
      const buttonRect = svgWrap.parentNode.getBoundingClientRect();
      const maxRight = buttonRect.right - svgWrap.offsetWidth;

      if (clientX >= buttonRect.left && clientX <= maxRight) {
        svgWrap.style.transform = `translateX(${clientX - buttonRect.left}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsSliding(false);

    // Determine if the icon has moved more than 90% of the button width
    const svgWrap = svgWrapRef.current;
    const buttonRect = svgWrap.parentNode.getBoundingClientRect();
    const maxRight = buttonRect.right - svgWrap.offsetWidth;

    if (svgWrap.getBoundingClientRect().right >= maxRight * 0.9) {
      // Programmatically click the button if the transition exceeds 90%
      buttonRef.current.click();
    } else {
      // Reset the icon's position if not clicked
      svgWrap.style.transform = "translateX(0)";
    }
  };

  const handleClick = () => {
    setClicked(true);
    // Add any other click event logic here if needed
  };

  return (
    <button
      className={`${styles.button} ${clicked ? styles.clicked : ""}`}
      type={type}
      ref={buttonRef} // Assign the ref to the button element
    >
      <div
        className={styles.svg__wrap}
        ref={svgWrapRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <BiRightArrowAlt />
      </div>
      {text}
    </button>
  );
}
