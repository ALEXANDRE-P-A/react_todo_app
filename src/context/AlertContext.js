import { createContext, useContext, useState } from "react";

const alertContext = createContext();

export const AlertProvider = ({ children }) => {

  const [ alertContent, setAlertContent ] = useState({ trigger: false, flag: 0, type: "", content: "" });

  return (
    <alertContext.Provider value={[ alertContent, setAlertContent ]}>
      { children }
    </alertContext.Provider>
  )
};

export const useAlert = _ => useContext(alertContext);