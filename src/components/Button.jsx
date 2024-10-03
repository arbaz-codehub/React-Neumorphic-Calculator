import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={(e) => {
        onClick();
        e.currentTarget.classList.add(styles.pulse);
        setTimeout(() => {
          e.currentTarget.classList.remove(styles.pulse);
        }, 200);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
