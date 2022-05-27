import React from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/Error.module.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Content}>
        <span className={styles.icon}>
          <CgTrashEmpty />
        </span>
        <p>No data Found </p>
      </div>

      <button className={styles.createBtn} onClick={() => navigate("/create")}>
        Create Post
      </button>
    </div>
  );
};

export default Error;
