import { createContext, useContext, useState } from "react";

const curretListContext = createContext();
const currenListIdContext = createContext();

export const CurrentListProvider = ({ children }) => {

  const [ currentList, setCurrentList ] = useState("");
  const [ currentListId, setCurrentListId ] = useState(0);

  return (
    <curretListContext.Provider value={[ currentList, setCurrentList ]}>
      <currenListIdContext.Provider value={[ currentListId, setCurrentListId ]}>
        { children }
      </currenListIdContext.Provider>
    </curretListContext.Provider>
  );
};

export const useCurrentList = _ => useContext(curretListContext);
export const useCurrentListId = _ => useContext(currenListIdContext);