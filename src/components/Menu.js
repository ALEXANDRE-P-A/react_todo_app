import "../App.css";

import { MdAdd } from "react-icons/md";

import { MdClear } from "react-icons/md";
import { CgPlayListSearch } from "react-icons/cg";
import { BiImport, BiExport } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { importList, clearList } from "../store/modules/todos";

import { useAddItemModal, useSwitchListModal } from "../context/ModalContext";
import { useCurrentList, useCurrentListId } from "../context/CurrentListContext";

export const Menu = _ => {

  const [ ,setAddItemModel ] = useAddItemModal();
  const [ ,setSwitchList ] = useSwitchListModal();
  const [ currentList, setCurrentList ] = useCurrentList();
  const [ ,setCurrentListId ] = useCurrentListId();
  
  const dispatch = useDispatch();

  let listId;
  let todos = "";

  const lists = useSelector(state => state.todos.lists);
  for(let list of lists){
    if(list.title === currentList){
      listId = list.id;
      todos = list.items;
    }
  }

  const clearListHandler = _ => {
    const confirmation = window.confirm("Are you sure clear the list ?");
    if(confirmation)
      dispatch(clearList(listId));
  };

  const importListHandler = async e => {

    if(!e.target.files || e.target.files.length === 0 || e.target.files[0].name.split(".")[1] !== "rta")
      return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = e => {
      const content = e.target.result;
      try {
        const jsonData = JSON.parse(content);
        dispatch(importList(jsonData));
        setCurrentListId(jsonData.id);
        setCurrentList(jsonData.title);
      } catch(err) {
        console.error("Unable to decode the file: ", err);
      }
    };

    reader.readAsText(file);
  };

  const exportListHandler = _ => {
    for(let list of lists){
      if(list.title === currentList){
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(list)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "list.rta";
        link.click();
      }
    }
  };

  const ListLength = _ => {
    
    if(lists.length !== 0)
      return <strong>({ lists.length })</strong>
  };

  return (
    <div className="menubar">
      <button
        type="button"
        className="menuBtn"
        onClick={ _ => setSwitchList(true) }
      >
        <CgPlayListSearch  className="menuIcon"  />
        <span className="menuText">switch list<ListLength /></span>
      </button>
      <div
        style={{
          position: "relative"
        }}
      >
        <input
          type="file"
          id="importFile"
          accept=".rta"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0
          }}
          onChange={ importListHandler }
        />
        <button
          type="button"
          className="menuBtn"
        >
          <BiImport  className="menuIcon" />
          <span className="menuText">import list</span>
        </button>
      </div>
      <button
        type="button"
        className="menuBtn"
        onClick={ _ => setAddItemModel(true) }
        disabled={ !currentList.length }
      >
       <MdAdd  className="menuIcon" />
       <span className="menuText">add item</span>
      </button>
      <button
        type="button"
        className="menuBtn"
        onClick={ exportListHandler }
        disabled={ !todos.length }
      >
        <BiExport  className="menuIcon" />
        <span className="menuText">export list</span>
      </button>
      <button
        type="button"
        className="menuBtn"
        onClick={ clearListHandler }
        disabled={ !todos.length }
      >
       <MdClear className="menuIcon" />
       <span className="menuText">clear</span>
      </button> 
    </div>
  );
};