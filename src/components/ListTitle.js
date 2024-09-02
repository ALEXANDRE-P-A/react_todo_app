import '../App.css';

import { useCurrentList, useCurrentListId } from '../context/CurrentListContext';
import { useSelector } from 'react-redux';

import { FaFilter } from "react-icons/fa";

import { useFilterTodoModal } from '../context/ModalContext';
import { useFilterTodo } from '../context/FilterTodoContext';

export const ListTitle = _ => {

  let itemNums;

  const [ currentList ] = useCurrentList();
  const [ currentListId ] = useCurrentListId();
  const [ ,setFilterTodoModal ] = useFilterTodoModal(false);
  const [ filterTodo ] = useFilterTodo();

  const lists = useSelector(state => state.todos.lists);
  
  for(let list of lists){
    if(list.id === currentListId){
      itemNums = list.items.length;
    }
  }

  const iconBoxStyle = filterTodo === 0 ? "icon-box" : "icon-box active";

  const ListName = _ => {

    return (
      <div className="listHeader">
        <div className="listHeaderTitle">
          <span className="listTitle">{ currentList }</span>
          {
            Boolean(itemNums) && (
              <div className={ iconBoxStyle }>
                <FaFilter className="filter-icon" onClick={ _ => setFilterTodoModal(true) }/>
              </div>
            )
          }
        </div>
      </div>
    )
  };

  return (
    <>
      {
        currentList !== "" ? <ListName /> : (<></>)
      }
    </>
  );
};