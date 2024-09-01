import "../App.css";

import { useFilterTodoModal } from "../context/ModalContext";
import { useFilterTodo } from "../context/FilterTodoContext";

import { IoIosClose } from "react-icons/io"; // close btn
import { LuListTodo } from "react-icons/lu"; // all items
import { LuListChecks } from "react-icons/lu"; // done items
import { LiaListSolid } from "react-icons/lia"; // todo items

export const FilterTodoModal = _ => {

  const [ ,setFilterTodoModal ] = useFilterTodoModal();
  const [ filterTodo, setFilterTodo ] = useFilterTodo();

  const closeModalHandler = _ => {
    document.querySelector(".filter-window-slide-down").classList.add("filter-window-slide-up");
    document.querySelector(".filter-modal").classList.add("hidden");
    setTimeout(_ => {
      setFilterTodoModal(false)
    }, 300);
  };

  const filterActionHandler = value => {
    setFilterTodo(value);
    closeModalHandler();
  }

  return (
    <div className="filter-modal show">
      <div className="filter-window-slide-down">
        <button type="button" className="filter-option" onClick={ _ => filterActionHandler(0) } disabled={ filterTodo === 0 }>
          <LuListTodo className="filter-option-icon" />
          <span className="filter-option-text">all items</span>
        </button>
        <button type="button" className="filter-option" onClick={ _ => filterActionHandler(1) } disabled={ filterTodo === 1 }>
          <LiaListSolid className="filter-option-icon" />
          <span className="filter-option-text">todo items</span>
        </button>
        <button type="button" className="filter-option" onClick={ _ => filterActionHandler(2) } disabled={ filterTodo === 2 }>
          <LuListChecks className="filter-option-icon" />
          <span className="filter-option-text">done items</span>
        </button>
      </div>
      <div className="filter-window-blank-space" onClick={ closeModalHandler } >
        <IoIosClose className="filter-window-clode-btn" />
      </div>
    </div>
  );
};