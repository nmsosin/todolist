import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
}

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
}

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
}

export type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const removeTodolistActionCreator = (todolistId: string): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    id: todolistId
  }
}

export const addTodolistActionCreator = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    title,
    todolistId: v1()
  }
}

export const changeTodolistTitleActionCreator = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title,
  }
}

export const changeTodolistFilterActionCreator = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter,
  }
}

export const todoListsReducer = (state:TodolistType[], action: ActionTypes ): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id);
    }
    
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        }
      ]
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state]
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state]
    }

    default:
      throw new Error("Unexpected to-do list action");
  }
}