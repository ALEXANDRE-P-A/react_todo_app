import { createContext, useContext, useState } from "react";

const SingleTodoContext = createContext();

export const SingleTodoProvider = ({ children }) => {

  const [ singleTdo, setSingleTodo ] = useState();

  return (
    <SingleTodoContext.Provider value={[ singleTdo, setSingleTodo ]}>
      { children }
    </SingleTodoContext.Provider>
  )
};

export const useTodo = _ => useContext(SingleTodoContext);