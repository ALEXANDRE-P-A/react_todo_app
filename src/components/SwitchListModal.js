import "../App.css";

import { TiArrowBack } from "react-icons/ti";
import { MdAdsClick } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

import { useSwitchListModal } from "../context/ModalContext";
import { useCurrentList, useCurrentListId } from "../context/CurrentListContext";
import { useFilterTodo } from "../context/FilterTodoContext";

import { useSelector, useDispatch } from "react-redux";
import { addList, editList, deleteList } from "../store/modules/todos";

import { useRef } from "react";

import moment from "moment";

import { useState } from "react";

export const SwitchListModal = _ => {

  const [ ,setSwitchListModal ] = useSwitchListModal();
  const [ ,setCurrentList ] = useCurrentList();
  const [ currentListId, setCurrentListId ] = useCurrentListId();
  const [ ,setFilterTodo ] = useFilterTodo();

  const lists = useSelector(state => state.todos.lists);

  const [ newListTitle, setNewListTitle ] = useState("");
  const [ btnDisable, switchBtnDisabled ] = useState(false);
  const [ titleEditMode, setTitleEditMode ] = useState({ id: "", flag: false });
  const [ editingTitle, setEditingTitle ] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef();

  const closeModalHandler = _ => {
    document.querySelector(".modal-slide-right").classList.add("modal-slide-left");
    setTimeout(_ => {
      setSwitchListModal(false);
    }, 500);
  };

  const selectListHandler = (id, list) => {
    setCurrentListId(id);
    setCurrentList(list);
    setFilterTodo(0);
    closeModalHandler();
  };

  const addListInputHandler = _ => {
    document.querySelector(".addListInputArea").classList.remove("hidden");
    switchBtnDisabled(true);
    inputRef.current.focus();
  };

  const addListHandler = e => {
    e.preventDefault();
    if(newListTitle.length === 0){
      alert("New List Title cannot be empty");
    } else {
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      const newList = {
        id: Math.floor(Math.random() * 1e5),
        title: newListTitle,
        created: now,
        items: []
      }
      setNewListTitle("");
      closeModalHandler();
      setCurrentListId(newList.id);
      setCurrentList(newList.title);
      dispatch(addList(newList));
    }
  };

  const deleteListHandler = (listId, listTitle, listLength) => {
    const confirm = window.confirm(`Are you sure to delete ${listTitle} with ${listLength} items ? `);
    if(confirm){
      setCurrentList("");
      dispatch(deleteList(listId));
    }
  };

  const editingCloseHandler = _ => {
    document.querySelector(".title-editing-window").classList.add("hidden");
    setTimeout(_ => {
      setEditingTitle("");
      setTitleEditMode({ id: "", flag: false });
    }, 500);
  };

  const editListTitle = e => {
    e.preventDefault();
    setCurrentList(editingTitle);
    dispatch(editList({ id: titleEditMode.id, title: editingTitle }));
    editingCloseHandler();
  };

  const editListTitleHandler = (id, title, flag) => {
    setTitleEditMode({ id, flag });
    setEditingTitle(title);
  };

  const Lists = _ => {

    return (
      <div style={{ width: "100%", maxHeight: "80%", overflowY: "scroll" }}>
        {
          lists.map((list, index) => 
            <div key={ index } className={ list.id === currentListId ? "single-list selected" : "single-list" }>
              <div className="single-list-touch-area" onClick={ _ => selectListHandler(list.id, list.title) }>
                <div className="single-list-icons">
                  { list.id === currentListId ? <GrRadialSelected className="single-list-icon" /> : <MdAdsClick className="single-list-icon" /> }
                </div>
                <div className="single-list-texts-area">
                  <div className="single-list-texts">
                    <span className="listTitle single-list-title">{ list.title }</span>
                    <span>&nbsp;({ list.items.length })</span>
                  </div>
                  <div className="single-list-sub">
                    <span>created { list.created }</span><br />
                    { list.updated && <span>updated { list.updated }</span> }
                  </div>
                </div>
              </div>
              <div className="single-list-click-options">
                <div className="single-list-click-option">
                  <MdModeEdit className="single-list-option-icon" onClick={ _ => editListTitleHandler(list.id, list.title, true) } />
                  <span className="menuText single-list-option-icon-text">edit</span>
                </div>
                <div className="single-list-click-option" onClick={ _ => deleteListHandler(list.id, list.title, list.items.length) }>
                  <MdDelete className="single-list-option-icon" />
                  <span className="menuText single-list-option-icon-text">delete</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  };

  return (
    <div className="modal-slide-right">
      <div className="switchListModalContent">
        <Lists />
        <form className="addListInputArea hidden" onSubmit={ addListHandler }>
          <input 
            type="text"
            className="modalInput lists"
            value={ newListTitle }
            onChange={ e => setNewListTitle(e.target.value) }
            placeholder="digite the new list title"
            ref={ inputRef }
          />
          <button type="submit" className="addListBtn">
            <MdAdd className="add-list-icon" />
            <span className="add-list-icon-text">add</span>
          </button>
        </form>
        <div className="switchModalBtnArea">
          <button 
            type="button"
            className="switchModalBtn"
            onClick={ addListInputHandler }
            disabled={ btnDisable }
          >
            <MdFormatListBulletedAdd className="switchModalBtnIcon" />
            <span className="menuText addNewListBtnText">add new list</span>
          </button>
          <button 
            type="button"
            className="switchModalBtn"
            onClick={ closeModalHandler }
          >
            <TiArrowBack className="switchModalBtnIcon" />
            <span className="menuText addNewListBtnText">back</span>
          </button>
        </div>
        {
          titleEditMode.flag && (
            <form className="title-editing-window show" onSubmit={ editListTitle }>
              <input 
                type="text"
                className="modalInput editing"
                value={ editingTitle }
                onChange={ e => setEditingTitle(e.target.value) }
                placeholder="edit the list title"
              />
              <div className="switchModalBtnArea editing">
                <button type="submit" className="switchModalBtn">
                  <BiSolidEditAlt className="add-list-icon" />
                  <span className="add-list-icon-text">edit</span>
                </button>
                <button type="button" className="switchModalBtn">
                  <MdCancel className="add-list-icon" onClick={ editingCloseHandler } />
                  <span className="add-list-icon-text">cancel</span>
                </button>
              </div>
            </form>
          )
        }
      </div>
      <div className="switch-list-window-blank-space" onClick={ closeModalHandler }></div>
    </div>
  );
};