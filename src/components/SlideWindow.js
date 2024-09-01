import "../App.css";

import { AddItemModal } from "./AddItemModal";
import { SwitchListModal } from "./SwitchListModal";
import { useAddItemModal, useSwitchListModal } from "../context/ModalContext";
import { useFilterTodoModal } from "../context/ModalContext";

import { ItemDetailsModal } from "./ItemDetailsModal";
import { useItemDetailsModal } from "../context/ModalContext";
import { useTodo } from "../context/SingleTodoContext";
import { FilterTodoModal } from "./FilterTodoModal";

export const SlideWindow = _ => {

  const [ addItemModal ] = useAddItemModal();
  const [ switchListModal ] = useSwitchListModal();
  const [ itemDetailsModal, setItemDetailsModal ] = useItemDetailsModal();
  const [ singleTodo ] = useTodo();
  const [ filterTodoModal ] = useFilterTodoModal();

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
      {
        filterTodoModal && <FilterTodoModal />
      }
    </>
  );
};