import "../App.css";
import logo from '../logo.svg';

import { MdAdd } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";

import { useSelector } from "react-redux";

import { Todo } from "./Todo.js";

import { useAddItemModal, useSwitchListModal } from "../context/ModalContext.js";
import { useCurrentList } from "../context/CurrentListContext.js";

const InsideContent = ({ title, items, setAddItemModel, setSwitchListModal }) => {

  if(title.length === 0){
    return (
      <div className="emptyCase">
        <button
          type="button"
          className="menuBtn"
          onClick={ _ => setSwitchListModal(true) }
        >
          <MdFormatListBulletedAdd  
            className="menuIcon" 
            style={{
              width: "36px",
              height: "36px"
            }}
          />
          <span className="menuText">select or add list</span>
        </button>
      </div>
    )
  } else if(items.length === 0){
    return (
      <div className="emptyCase">
        <button
          type="button"
          className="menuBtn"
          onClick={ _ => setAddItemModel(true) }
        >
          <MdAdd  
            className="menuIcon" 
            style={{
              width: "36px",
              height: "36px"
            }}
          />
          <span className="menuText">add item</span>
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
  const lists = useSelector(state => state.todos.lists);

  for(let list of lists){
    if(list.title === currentList){
      todos = list.items;
    }
  }
  
  return (
    <div className='container'>
      <img src={logo} className="App-logo" alt="logo" />
      <InsideContent 
        title={ currentList }
        items={ todos }
        setAddItemModel={ setAddItemModel }
        setSwitchListModal={ setSwitchListModal }
      />
    </div>
  );
};