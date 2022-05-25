import React, { createContext, useReducer } from "react";
import { FormReducer } from "../reducers";
export const FormContext = createContext();

const intialState = {
  id: "",
  title: "",
  author: "",
  description: "",
  file: null,
};

export const FormContextWrapper = ({ children }) => {
  const [data, dispatch] = useReducer(FormReducer, intialState);

  return (
    <FormContext.Provider value={[data, dispatch]}>
      {children}
    </FormContext.Provider>
  );
};
