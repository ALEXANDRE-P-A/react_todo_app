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
    editList(state, action){
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      state.lists = state.lists.map(list => {
        return list.id === action.payload.id ?
        { ...list, title: action.payload.title, updated: now } :
        { ...list };
      });
    },
    importList(state, action){
      state.lists = [ action.payload, ...state.lists ]
    },
    deleteList(state, action){
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    add(state, action){
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      for(let list of state.lists){
        if(list.title === action.payload.list){
          list.items = [ ...list.items, action.payload ];
          list.updated = now;
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
          list.updated = now;
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
          });
          list.updated = now;
        }
      }
    },
    deleteTodo(state, action){
      const now = moment().format("YYYY/MM/DD hh:mm:ss a");
      for(let list of state.lists){
        if(list.id === action.payload.list){
          list.items = list.items.filter(item => item.id !== action.payload.todo);
          list.updated = now;
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
   editList,
   importList,
   deleteList,
   add,
   complete,
   editTodo,
   deleteTodo,
   clearList
} = todoSlice.actions;

export default todoSlice.reducer;