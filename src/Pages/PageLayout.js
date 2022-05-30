import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/layout.module.css";

const PageLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
};

export default PageLayout;
