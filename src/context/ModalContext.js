import { createContext, useContext, useState } from "react";

const addItemModalContext = createContext();
const switchListModalContext = createContext();
const itemDetailsModalContext = createContext();
const filterTodoModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [ addItemModal, setAddItemModel ] = useState(false);
  const [ switchListModal, setSwitchListModal ] = useState(false);
  const [ itemDetailsModal, setItemDetailsModal ] = useState(false);
  const [ filterTodoModal, setFilterTodoModal ] = useState(false);

  return (
    <addItemModalContext.Provider value={[ addItemModal, setAddItemModel ]}>
      <switchListModalContext.Provider value={[ switchListModal, setSwitchListModal ]}>
        <itemDetailsModalContext.Provider value={[ itemDetailsModal, setItemDetailsModal ]}>
          <filterTodoModalContext.Provider value={[ filterTodoModal, setFilterTodoModal ]}>
            { children }
          </filterTodoModalContext.Provider>
        </itemDetailsModalContext.Provider>
      </switchListModalContext.Provider>
    </addItemModalContext.Provider>
  )
};

export const useAddItemModal = _ => useContext(addItemModalContext);
export const useSwitchListModal = _ => useContext(switchListModalContext);
export const useItemDetailsModal = _ => useContext(itemDetailsModalContext);
export const useFilterTodoModal = _ => useContext(filterTodoModalContext);