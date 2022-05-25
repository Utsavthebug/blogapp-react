import React from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import styles from "../styles/components/navbar.module.css";
import { Link } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className={match && styles.activeLink} style={{ padding: "5px" }}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
