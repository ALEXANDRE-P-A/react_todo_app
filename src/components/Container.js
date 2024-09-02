import "../App.css";
import logo from '../logo.svg';

import { MdAdd } from "react-icons/md";
import { MdFormatListBulletedAdd, MdFormatListBulleted } from "react-icons/md";

import { useSelector } from "react-redux";

import { Todo } from "./Todo.js";

import { useAddItemModal, useSwitchListModal } from "../context/ModalContext.js";
import { useCurrentList } from "../context/CurrentListContext.js";

const InsideContent = ({ title, listsLength, items, setAddItemModel, setSwitchListModal }) => {

  const addNewListBtnAction = _ => {
    setSwitchListModal(true);
    setTimeout(_ => {
      const addListBtn = document.querySelector(".add-new-list-btn");
      addListBtn.click();
    }, 300);    
  };

  if(listsLength === 0){
    return (
      <div className="emptyCase">
        <button type="button" className="menuBtn empty-case-btn" onClick={ addNewListBtnAction }>
          <MdFormatListBulletedAdd  className="menuIcon empty-case-btn-icon" />
          <span className="menuText empty-case-btn-text lists">add list</span>
        </button>
      </div>
    )
  } else if(title.length === 0){
    return (
      <div className="emptyCase">
        <button type="button" className="menuBtn empty-case-btn" onClick={ _ => setSwitchListModal(true) }>
          <MdFormatListBulleted className="menuIcon empty-case-btn-icon serach-list" />
          <span className="menuText empty-case-btn-text lists">search list({ listsLength || "0" })</span>
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
  
  const [ ,setAddItemModel ] = useAddItemModal();
  const [ ,setSwitchListModal ] = useSwitchListModal(false);
  const [ currentList ] = useCurrentList();

  let todos;
  let listsLength = 0;
  const lists = useSelector(state => state.todos.lists);

  for(let list of lists){
    listsLength = lists.length;
    if(list.title === currentList){
      todos = list.items;
    }
  }
  
  return (
    <div className='container'>
      <img src={ logo } className="App-logo" alt="logo" />
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