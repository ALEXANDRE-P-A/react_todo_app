import "../App.css";

import { MdReadMore } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineRedo } from "react-icons/md";

import { useItemDetailsModal } from "../context/ModalContext.js";

import { useTodo } from "../context/SingleTodoContext.js";

export const Todo = ({ todo }) => {

  const [ , setItemDetailsModal ] = useItemDetailsModal(false);
  const [ ,setSingleTodo ] = useTodo();

  const clickHandler = _ => {
    setSingleTodo(todo);
    setItemDetailsModal(prev => !prev);
  };

  let itemStyle = todo.flag ? "item" : "item completed";

  return (
    <>
      <button
        type="button"
        className={ itemStyle }
        onClick={ clickHandler }
      >
        <div className="contentBox" style={{ flexDirection: "column" }}>
          <span className="itemText">{ todo.title }</span>
          <span className="itemText" style={{ fontSize: "10px", fontWeight: "lighter" }}>created { todo.created }</span>
        </div>
        <div className="contentBox">
          <div className="menuBtn">
            <MdReadMore style={{ width: "18px", height: "18px" }} />
            <span className="menuText" style={{ fontSize: "6px" }}>details</span>
          </div>
          { todo.flag && (
              <div className="menuBtn">
                <RiShareForwardFill style={{ width: "18px", height: "18px" }} />
                <span className="menuText" style={{ fontSize: "6px" }}>complete</span>
              </div>
            ) 
          }
          {
            !todo.flag && (
              <div className="menuBtn">
                <MdOutlineRedo  style={{ width: "18px", height: "18px" }} />
                <span className="menuText" style={{ fontSize: "6px" }}>redo</span>
              </div>
            )
          }
          {
            todo.flag && (
            <div className="menuBtn">
              <MdModeEdit style={{ width: "18px", height: "18px" }} />
              <span className="menuText" style={{ fontSize: "6px" }}>edit</span>
            </div>
            )
          }
          <div className="menuBtn">
            <MdDelete style={{ width: "18px", height: "18px" }} />
            <span className="menuText" style={{ fontSize: "6px" }}>delete</span>
          </div>
        </div>
      </button>
    </>
  )
};