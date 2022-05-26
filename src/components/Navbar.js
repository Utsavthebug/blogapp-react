import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/navbar.module.css";
import CustomLink from "./CustomLink";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.tag} onClick={() => navigate("/")}>
        <p>B</p>
      </div>

      <ul className={styles.navul}>
        <li className={styles.navl}>
          <CustomLink to="/" className={styles.a}>
            Blogs
          </CustomLink>
        </li>

        <li className={styles.navl}>
          <CustomLink to="/create" className={styles.a}>
            Create
          </CustomLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
