import "../App.css";

import { AddItemModal } from "./AddItemModal";
import { SwitchListModal } from "./SwitchListModal";
import { useAddItemModal, useSwitchListModal } from "../context/ModalContext";

import { ItemDetailsModal } from "./ItemDetailsModal";
import { useItemDetailsModal } from "../context/ModalContext";
import { useTodo } from "../context/SingleTodoContext";

export const SlideWindow = _ => {

  const [ addItemModal ] = useAddItemModal();

  const [ switchListModal ] = useSwitchListModal();

  const [ itemDetailsModal, setItemDetailsModal ] = useItemDetailsModal(false);
  const [ singleTodo ] = useTodo();

  return (
    <>
      {
        addItemModal && <AddItemModal />
      }
      {
        switchListModal && <SwitchListModal />
      }
      {
        itemDetailsModal && <ItemDetailsModal todo={ singleTodo } setItemDetailsModal={ setItemDetailsModal }/>
      }
    </>
  );
};