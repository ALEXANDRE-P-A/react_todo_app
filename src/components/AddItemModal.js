import "../App.css";

import { useState, useRef, useEffect } from "react";

import { MdAdd } from "react-icons/md";
import { MdCancel } from "react-icons/md";

import moment from "moment";

import { useDispatch } from "react-redux";

import { add } from "../store/modules/todos";

import { useAddItemModal } from "../context/ModalContext";

import { useCurrentList } from "../context/CurrentListContext";  
import { useAlert } from "../context/AlertContext";

export const AddItemModal = _ => {

  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");

  const [ ,setAddItemModel ] = useAddItemModal();
  const [ currentList ] = useCurrentList();
  const [ ,setAlertContent ] = useAlert();

  const dispatch = useDispatch();

  const inputRef = useRef();

  const closeModalHandler = _ => {
    setTitle("");
    setContent("");
    document.querySelector(".modal-slide-down").classList.add("modal-slide-up");
    setTimeout(_ => {
      setAddItemModel(false);
    }, 500);
  };

  const addItemHandler = e => {
    e.preventDefault();
    if(title.length === 0){
      alert("Title cannot be empty");
    } else {
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      const newTodo = {
        id: Math.floor(Math.random() * 1e5),
        title: title,
        content: content,
        created: now,
        flag: true,
        list: currentList
      };
      dispatch(add(newTodo));
      closeModalHandler();
      setAlertContent({ trigger: true, flag: 0, type: "item", content: newTodo.title, action: "add" });
    }    
  };

  useEffect(_ => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="modal-slide-down" onSubmit={ addItemHandler }>
      <div className="menuBtn">
        <MdAdd  className="menuIcon" style={{ width: "48px", height: "48px" }}  />
        <span className="menuText" style={{ fontSize: "18px", fontWeight: "bold" }}>add item</span>
      </div>
      <input 
        type="text" 
        className="modalInput" 
        value={ title }
        onChange={ e => setTitle(e.target.value) }
        placeholder="type a new item here"
        ref={ inputRef }
      />
      <textarea
        className="modalInput modalTextArea"
        value={ content }
        onChange={ e => setContent(e.target.value) }
        placeholder="details(optional)" 
      ></textarea>
      <div className="modalButtons">
        <button 
          type="submit"
          className="modalBtn"
        >
          <MdAdd className="modalBtnIcon" />
          <span className="modalBtnText">add</span>
        </button>
        <button 
          type="button"
          className="modalBtn"
          onClick={ closeModalHandler }
        >
          <MdCancel className="modalBtnIcon" />
          <span className="modalBtnText">cancel</span>
        </button>
      </div>
    </form>
  )
};