import { createSlice } from "@reduxjs/toolkit";

import moment from "moment";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    lists: [],
  },
  reducers: {
    addList(state, action){
      state.lists = [ action.payload, ...state.lists ]
    },
    importList(state, action){
      state.lists = [ action.payload, ...state.lists ]
    },
    deleteList(state, action){
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    add(state, action){
      for(let list of state.lists){
        if(list.title === action.payload.list){
          list.items = [ ...list.items, action.payload ];
        }
      }
    },
    complete(state, action){
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      for(let list of state.lists){
        if(list.id === action.payload.list){
          list.items = list.items.map(item => {
            if(action.payload.flag){
              delete item.updated;
              return (
                item.id === action.payload.todo ?
                  { ...item, flag: !item.flag, completed: now } :
                  { ...item }
              )
            } else {
              delete item.completed;
              return (
                item.id === action.payload.todo ?
                  { ...item, flag: !item.flag, updated: now } :
                  { ...item }
              )
            }
          });
        }
      }
    },
    editTodo(state, action){
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      for(let list of state.lists){
        if(list.id === action.payload.list){
          list.items = list.items.map(item => {
            return item.id === action.payload.todo ?
            { ...item, title: action.payload.title, content: action.payload.content, updated: now } :
            { ...item }
          })
        }
      }
    },
    deleteTodo(state, action){
      for(let list of state.lists){
        if(list.id === action.payload.list){
          list.items = list.items.filter(item => item.id !== action.payload.todo);
        }
      }
    },
    clearList(state, action){
      for(let list of state.lists){
        if(list.id === action.payload)
          list.items = [];
      }
    }
  }
});

export const {
   addList,
   importList,
   deleteList,
   add,
   complete,
   editTodo,
   deleteTodo,
   clearList
} = todoSlice.actions;

export default todoSlice.reducer;