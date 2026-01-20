import React from "react";
import styles from "./Card.module.css";

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = "default",
  padding = "medium",
  hover = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${styles[padding]} ${hover ? styles.hover : ""} ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {headerAction && (
            <div className={styles.headerAction}>{headerAction}</div>
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
