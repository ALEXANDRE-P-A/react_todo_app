import "../App.css";
import logo from '../logo.svg';

import { MdAdd } from "react-icons/md";
import { MdPlaylistAdd  } from "react-icons/md";

import { useSelector } from "react-redux";

import { Todo } from "./Todo.js";

import { useAddItemModal, useSwitchListModal } from "../context/ModalContext.js";
import { useCurrentList } from "../context/CurrentListContext.js";

const InsideContent = ({ title, listsLength, items, setAddItemModel, setSwitchListModal }) => {

  if(title.length === 0){
    return (
      <div className="emptyCase">
        <button type="button" className="menuBtn empty-case-btn" onClick={ _ => setSwitchListModal(true) }>
          <MdPlaylistAdd className="menuIcon empty-case-btn-icon" />
          <span className="menuText empty-case-btn-text lists">lists({ listsLength || "0" })</span>
        </button>
      </div>
    )
  } else if(items.length === 0){
    return (
      <div className="emptyCase">
        <button type="button" className="menuBtn empty-case-btn" onClick={ _ => setAddItemModel(true) }>
          <MdAdd className="menuIcon empty-case-btn-icon" />
          <span className="menuText empty-case-btn-text items">add item</span>
        </button>
      </div>
    )
  } else {
    return (
      items.map(todo => <Todo key={ todo.id } todo={ todo } />)
    )
  }
};

export const Container = _ => {

  console.log("Container render ...")

  const [ ,setAddItemModel ] = useAddItemModal();
  const [ ,setSwitchListModal ] = useSwitchListModal(false);
  const [ currentList ] = useCurrentList();

  let todos;
  let listsLength;
  const lists = useSelector(state => state.todos.lists);

  for(let list of lists){
    listsLength = lists.length;
    if(list.title === currentList){
      todos = list.items;
    }
  }
  
  return (
    <div className='container'>
      <img src={logo} className="App-logo" alt="logo" />
      <InsideContent 
        title={ currentList }
        listsLength={ listsLength }
        items={ todos }
        setAddItemModel={ setAddItemModel }
        setSwitchListModal={ setSwitchListModal }
      />
    </div>
  );
};