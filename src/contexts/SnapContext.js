import React, { createContext, useState } from "react";
export const SnapContext = createContext();

export const SnapContextWrapper = ({ children }) => {
  const [documentSnap, setdocumentSnap] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SnapContext.Provider
      value={{ documentSnap, setdocumentSnap, currentPage, setCurrentPage }}
    >
      {children}
    </SnapContext.Provider>
  );
};
