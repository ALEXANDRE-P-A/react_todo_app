import '../App.css';

import { useCurrentList, useCurrentListId } from '../context/CurrentListContext';
import { useSelector } from 'react-redux';

export const ListTitle = _ => {

  let itemNums;

  const [ currentList ] = useCurrentList();
  const [ currentListId ] = useCurrentListId();
  const lists = useSelector(state => state.todos.lists);

  for(let list of lists){
    if(list.id === currentListId){
      itemNums = list.items.length;
    }
  }

  const ListName = _ => {

    return (
      <div className="listName">
        { currentList }
        ({ itemNums })
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