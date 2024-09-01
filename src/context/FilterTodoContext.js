import { createContext, useContext, useState } from "react";

const filterTodoContext = createContext();

export const FilterTodoProvider = ({ children }) => {

  const [ filterTodo, setFilterTodo ] = useState(0);  

  return (
    <filterTodoContext.Provider value={[ filterTodo, setFilterTodo ]}>
      { children }
    </filterTodoContext.Provider>
  )
};

export const useFilterTodo = _ => useContext(filterTodoContext);