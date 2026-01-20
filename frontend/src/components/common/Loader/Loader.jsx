import React from "react";
import styles from "./Loader.module.css";

const Loader = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) => {
  const LoaderContent = () => (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
};

export default Loader;
