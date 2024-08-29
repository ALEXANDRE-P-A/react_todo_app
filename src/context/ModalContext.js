import { createContext, useContext, useState } from "react";

const addItemModalContext = createContext();
const switchListModalContext = createContext();
const itemDetailsModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [ addItemModal, setAddItemModel ] = useState(false);
  const [ switchListModal, setSwitchListModal ] = useState(false);
  const [ itemDetailsModal, setItemDetailsModal ] = useState(false);

  return (
    <addItemModalContext.Provider value={[ addItemModal, setAddItemModel ]}>
      <switchListModalContext.Provider value={[ switchListModal, setSwitchListModal ]}>
        <itemDetailsModalContext.Provider value={[ itemDetailsModal, setItemDetailsModal ]}>
          { children }
        </itemDetailsModalContext.Provider>
      </switchListModalContext.Provider>
    </addItemModalContext.Provider>
  )
};

export const useAddItemModal = _ => useContext(addItemModalContext);
export const useSwitchListModal = _ => useContext(switchListModalContext);
export const useItemDetailsModal = _ => useContext(itemDetailsModalContext);