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
import { useAlert } from "../context/AlertContext";

export const Menu = _ => {

  const [ ,setAddItemModel ] = useAddItemModal();
  const [ ,setSwitchList ] = useSwitchListModal();
  const [ currentList, setCurrentList ] = useCurrentList();
  const [ ,setCurrentListId ] = useCurrentListId();
  const [ ,setAlertContent ] = useAlert();
  
  const dispatch = useDispatch();

  let listId;
  let listTitle = "";
  let todos = "";

  const lists = useSelector(state => state.todos.lists);
  for(let list of lists){
    if(list.title === currentList){
      listId = list.id;
      listTitle = list.title;
      todos = list.items;
    }
  }

  const clearListHandler = _ => {
    const confirmation = window.confirm(`Are you sure clear the list ${ listTitle } with ${ todos.length } items ?`);
    if(confirmation){
      dispatch(clearList(listId));
      setAlertContent({ trigger: true, flag: 0, type: "list", content: listTitle, action: "clear" });
    }
  };

  const importListHandler = async e => {

    const checkDuplicate = id => {
      for(let list of lists){
        if(list.id === id)
          return false
      }
      return true;
    };

    if(!e.target.files || e.target.files.length === 0 || e.target.files[0].name.split(".")[1] !== "rta")
      return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = e => {
      const content = e.target.result;
      try {
        const jsonData = JSON.parse(content);
        if(checkDuplicate(jsonData.id)){
          dispatch(importList(jsonData));
          setCurrentListId(jsonData.id);
          setCurrentList(jsonData.title);
          setAlertContent({ trigger: true, flag: 0, type: "list", content: jsonData.title, action: "import" });
        } else {
          setAlertContent({ trigger: true, flag: 3, action: "this list is already imported" });
        }
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
        setAlertContent({ trigger: true, flag: 0, type: "list", content: list.title, action: "export" });
      }
    }
  };

  const ListLength = _ => { 
    if(lists.length !== 0 || lists.length !== undefined)
      return <strong>{ lists.length }</strong>
  };

  return (
    <div className="menubar">

      <button type="button" className="menuBtn list" onClick={ _ => setSwitchList(true) } disabled={ !lists.length }>
        <CgPlayListSearch  className="menuIcon"  />
        <div className="menu-btn-list-length"><ListLength /></div>
        <span className="menuText">search list</span>
      </button>

      <div className="list-import-btn-div">
        <input type="file" id="importFile" accept=".rta" className="list-import-btn-input" onChange={ importListHandler } />
        <button type="button" className="menuBtn">
          <BiImport className="menuIcon" />
          <span className="menuText">import list</span>
        </button>
      </div>

      <button type="button" className="menuBtn" onClick={ _ => setAddItemModel(true) } disabled={ !currentList.length }>
       <MdAdd  className="menuIcon" />
       <span className="menuText">add item</span>
      </button>

      <button type="button" className="menuBtn" onClick={ exportListHandler } disabled={ !todos.length }>
        <BiExport  className="menuIcon" />
        <span className="menuText">export list</span>
      </button>

      <button type="button" className="menuBtn" onClick={ clearListHandler } disabled={ !todos.length }>
       <MdClear className="menuIcon" />
       <span className="menuText">clear list</span>
      </button> 
    </div>
  );
};