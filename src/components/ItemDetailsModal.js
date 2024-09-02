import "../App.css";

import { RiShareForwardFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineRedo } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdDone } from "react-icons/md";


import { complete, editTodo, deleteTodo } from "../store/modules/todos";
import { useDispatch } from "react-redux";

import { useState } from "react";

import { useCurrentListId } from "../context/CurrentListContext";
import { useAlert } from "../context/AlertContext";

export const ItemDetailsModal = ({ todo, setItemDetailsModal }) => {

  const dispatch = useDispatch();

  const [ edit, switchEdit ] = useState(false);
  const [ title, setTitle ] = useState(todo.title);
  const [ content, setContent ] = useState(todo.content);

  const [ currentListId ] = useCurrentListId();
  const [ ,setAlertContent ] = useAlert();

  const closeModalHandler = _ => {
    document.querySelector(".modal-slide-down").classList.add("modal-slide-up");
    setTimeout(_ => {
      setItemDetailsModal(false)
    }, 500);
  };

  const completeRedoSwitchHandler = _ => {
    const msgText = todo.flag ? "complete" : "redo";
    const confirmation = window.confirm(`Are you sure to ${msgText} ${title} ?`);
    if(confirmation){
      dispatch(complete({ list: currentListId, todo: todo.id, flag: todo.flag }));
      closeModalHandler();
    }
    setAlertContent({ trigger: true, flag: 0, type: "item", content: title, action: "updat" });
  };

  const editHandler = e => {
    e.preventDefault();
    dispatch(editTodo({ 
      list: currentListId,
      todo: todo.id, 
      title: title, 
      content: content 
    }));
    switchEdit(false);
    setAlertContent({ trigger: true, flag: 0, type: "item", content: title, action: "updat" });
  };

  const editCancelHandler = _ => {
    switchEdit(false);
    setTitle(todo.title);
    setContent(todo.content);
  };

  const deleteHandler = _ => {
    const confirmation = window.confirm(`Are you sure to delete ${title} ?`);
    if(confirmation){
      dispatch(deleteTodo({ list: currentListId, todo: todo.id }));
      closeModalHandler();
      setAlertContent({ trigger: true, flag: 0, type: "item", content: title, action: "delet" });
    }
  };

  const TodoContent = _ => {
    if(content.length !== 0){
      return (
        <div className="itemText modalTextArea" >{ content }</div>
      )
    }
  }

  return (
    <div className="modal-slide-down">
      <div 
        className="item"
        style={{
          width: "90%",
          border: "none"
        }}
      >
        { !todo.flag && <span><MdDone style={{ width: "32px", height: "32px", color: "00d8ff" }}/></span> }
        <form className="contentBox" style={{ flexDirection: "column" }} onSubmit={ editHandler }>
          {
            edit === false ?
              (
                <span 
                  className="itemText" 
                  style={{ 
                    width: "auto", 
                    fontSize: "24px" 
                  }}
                  >{ title }</span>
              ) :
              (
                <input 
                  type="text" 
                  className="modalInput" 
                  value={ title }
                  onChange={ e => setTitle(e.target.value) }
                  placeholder="type a new item here"
                />
              )
          }
          <span className="itemText" style={{ width: "auto", fontSize: "15px", fontWeight: "200" }}><strong>Added in { todo.list } list</strong></span>
          <span className="itemText" style={{ width: "auto", fontSize: "15px", fontWeight: "200" }}>created { todo.created }</span>
          {
            todo.updated && (
              <span className="itemText" style={{ width: "auto", fontSize: "15px", fontWeight: "200" }}>updated { todo.updated }</span>
            )
          }
          {
            todo.completed && (
              <span className="itemText" style={{ width: "auto", fontSize: "15px", fontWeight: "200" }}>completed { todo.completed }</span>
            )
          }
          {
            edit === false ?
              (
                <TodoContent />
              ) :
              (
                <>
                  <textarea
                    className="modalInput modalTextArea"
                    value={ content }
                    onChange={ e => setContent(e.target.value) }
                    placeholder="details(optional)" 
                  />
                  <div className="modalButtons">
                    <button 
                      type="submit"
                      className="modalBtn"
                      onClick={ editHandler }
                    >
                      <MdModeEdit className="modalBtnIcon" />
                      <span className="modalBtnText">edit</span>
                    </button>
                    <button 
                      type="button"
                      className="modalBtn"
                      onClick={ editCancelHandler }
                    >
                      <MdCancel className="modalBtnIcon" />
                      <span className="modalBtnText">cancel</span>
                    </button>
                  </div>
                </>
              )
          }  
        </form>
        <div className="contentBox">
          <button type="button" className="menuBtn" onClick={ closeModalHandler } disabled={ edit }>
            <TiArrowBack  style={{ width: "48px", height: "48px" }} />
            <span className="menuText" style={{ fontSize: "12px" }}>back</span>
          </button>
          <button type="button" className="menuBtn" onClick={ completeRedoSwitchHandler } disabled={ edit }>
            {
              todo.flag ?
                (
                  <>
                    <RiShareForwardFill style={{ width: "48px", height: "48px" }} />
                    <span className="menuText" style={{ fontSize: "12px" }}>complete</span>
                  </>
                ) : (
                  <>
                    <MdOutlineRedo style={{ width: "48px", height: "48px" }} />
                    <span className="menuText" style={{ fontSize: "12px" }}>redo</span>
                  </>
                )
            }
            
          </button>
          {
            todo.flag && (
              <button type="button" className="menuBtn" onClick={ _ => switchEdit(true) } disabled={ edit }>
                <MdModeEdit style={{ width: "48px", height: "48px" }} />
                <span className="menuText" style={{ fontSize: "12px" }}>edit</span>
              </button>
            )
          }
          <button type="button" className="menuBtn" onClick={ deleteHandler } disabled={ edit }>
            <MdDelete style={{ width: "48px", height: "48px" }} />
            <span className="menuText" style={{ fontSize: "12px" }}>delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};