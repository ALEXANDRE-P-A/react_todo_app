import "../App.css";

import { TiArrowBack } from "react-icons/ti";
import { MdAdsClick } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";

import { useSwitchListModal } from "../context/ModalContext";
import { useCurrentList, useCurrentListId } from "../context/CurrentListContext";

import { useSelector, useDispatch } from "react-redux";
import { addList, deleteList } from "../store/modules/todos";

import { useRef } from "react";

import moment from "moment";

import { useState } from "react";

export const SwitchListModal = _ => {

  const [ ,setSwitchListModal ] = useSwitchListModal();
  const [ ,setCurrentList ] = useCurrentList();
  const [ currentListId, setCurrentListId ] = useCurrentListId();

  const lists = useSelector(state => state.todos.lists);

  const [ newListTitle, setNewListTitle ] = useState("");
  const [ btnDisable, switchBtnDisabled ] = useState(false);
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

  const Lists = _ => {

    return (
      <div style={{ width: "100%", maxHeight: "80%", overflowY: "scroll" }}>
        {
          lists.map((list, index) => 
            <div key={ index } style={{
               width: "97.5%", margin: "17.8px 0",padding: "0 1.25%", height: "40px", display: "flex", justifyContent: "space-between", color: "#00d8ff" 
              }}
              className={ list.id === currentListId ? "listSelectedOpacity" : "listNonSelectedOpacity" } 
            >
              <div style={{ width: "75%", display: "flex" }}  onClick={ _ => selectListHandler(list.id, list.title) }>
                <div style={{ width: "20%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {
                    list.id === currentListId ?
                      <GrRadialSelected style={{ 
                        width: "24px", 
                        height: "24px",
                      }} /> :
                      <MdAdsClick style={{ 
                        width: "24px", 
                        height: "24px",
                      }}
                    />
                  }
                </div>
                <div style={{ width: "80%", height: "100%" }}>
                  <div style={{ width: "100%", height: "65%", fontSize: "18px", display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                    <span   
                      style={{ 
                        wordBreak: "break-all",
                        fontWeight: "bold"
                      }}
                      className="listTitle"
                    >{ list.title }</span>
                    <span>&nbsp;({ list.items.length })</span>
                  </div>
                  <div style={{ width: "100%", height: "35%", fontSize: "10px" }}>
                    <span>created { list.created }</span>
                  </div>
                </div>
              </div>
              <div style={{ width: "25%",  display: "flex", alignSelf: "flex-end" }}>
                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"  }}>
                  {/* <MdModeEdit style={{ width: "24px", height: "24px" }} />
                  <span className="menuText" style={{ fontSize: "8px" }}>edit</span> */}
                </div>
                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"  }} onClick={ _ => deleteListHandler(list.id, list.title, list.items.length) }>
                  <MdDelete style={{ width: "24px", height: "24px" }} />
                  <span className="menuText" style={{ fontSize: "8px" }}>delete</span>
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
            className="modalInput"
            style={{
              width: "78%",
              height: "100%"
            }}
            value={ newListTitle }
            onChange={ e => setNewListTitle(e.target.value) }
            placeholder="digite the new list title"
            ref={ inputRef }
          />
          <button type="submit" className="addListBtn">
            <MdAdd style={{ width: "36px", height: "36px" }} />
            <span style={{ fontSize: "1.2em" }}>add</span>
          </button>
        </form>
        <div 
          className="switchModalBtnArea"
        >
          <button 
            type="button"
            className="switchModalBtn"
            onClick={ addListInputHandler }
            disabled={ btnDisable }
          >
            <MdFormatListBulletedAdd 
              className="switchModalBtnIcon"
            />
            <span className="menuText" style={{ fontSize: "12px" }}>add new list</span>
          </button>
          <button 
            type="button"
            className="switchModalBtn"
            onClick={ closeModalHandler }
          >
            <TiArrowBack
              className="switchModalBtnIcon"
            />
            <span className="menuText" style={{ fontSize: "12px" }}>back</span>
          </button>
        </div>
      </div>
      <div style={{ width: "20%", height: "100%" }} onClick={ closeModalHandler }></div>
    </div>
  );
};