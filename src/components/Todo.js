import "../App.css";

import { MdReadMore, MdDone } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { MdModeEdit, MdOutlineRedo, MdRemoveRedEye  } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { useItemDetailsModal } from "../context/ModalContext.js";
import { useTodo } from "../context/SingleTodoContext.js";
import { useFilterTodo } from "../context/FilterTodoContext.js";

export const Todo = ({ todo }) => {

  const [ filterTodo ] = useFilterTodo();
  const [ ,setItemDetailsModal ] = useItemDetailsModal(false);
  const [ ,setSingleTodo ] = useTodo();

  if(filterTodo !== 0 && ((Number(todo.flag) + 1) === filterTodo )){
    return
  }

  const clickHandler = _ => {
    setSingleTodo(todo);
    setItemDetailsModal(prev => !prev);
  };

  const CheckSimble = _ => {

    if(!todo.flag){
      return (
        <div className="check-simble">
          <MdDone className="check-simble-icon" />
        </div>
      )
    }
  };

  const ContentSimble = _ => {
    if(todo.content.length !== 0){
      return (
        <MdRemoveRedEye className="content-simble-icon" />
      )
    }
  };

  const DetailsIcon = _ => {

    return (
      <div className="menuBtn">
        <MdReadMore className="menuBtn-icon"/>
        <span className="menuText icon">details</span>
      </div>
    )
  };

  const CompleteBtnIcon = _ => {
    if(todo.flag){
      return (
        <div className="menuBtn">
          <RiShareForwardFill className="menuBtn-icon"/>
          <span className="menuText icon">complete</span>
        </div>
      )
    }
  };

  const RedoBtnIcon = _ => {
    if(!todo.flag){
      return (
        <div className="menuBtn">
          <MdOutlineRedo className="menuBtn-icon" />
          <span className="menuText icon">redo</span>
        </div>
      )
    }
  };

  const EditBtnIcon = _ => {
    if(todo.flag){
      return (
        <div className="menuBtn">
          <MdModeEdit className="menuBtn-icon"/>
          <span className="menuText icon">edit</span>
        </div>
      )
    }
  };

  const DeleteBtnIcon = _ => {

    return (
      <div className="menuBtn">
        <MdDelete className="menuBtn-icon"/>
        <span className="menuText icon">delete</span>
      </div>
    )
  };

  let itemStyle = todo.flag ? "item todo" : "item todo completed";

  return (
    <button type="button" className={ itemStyle } onClick={ clickHandler }>
      <CheckSimble />
      <div className="contentBox todo">
        <div className="todo-title">
          <span className="itemText">{ todo.title }</span>
          <ContentSimble />
        </div>
        <span className="itemText created">created { todo.created }</span>
      </div>
      <div className="contentBox">
        <DetailsIcon />
        <CompleteBtnIcon />
        <RedoBtnIcon />
        <EditBtnIcon />
        <DeleteBtnIcon />
      </div>
    </button>
  )
};