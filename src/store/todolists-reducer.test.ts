import { addTodolistActionCreator, changeTodolistFilterActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator, todoListsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

test('correct to-do list should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
  
  const endState = todoListsReducer(startState, removeTodolistActionCreator(todolistId2));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
})

test('correct to-do list should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
  
  const endState = todoListsReducer(startState, addTodolistActionCreator(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
})

test('correct to-do list should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todoListsReducer(startState, changeTodolistTitleActionCreator(todolistId2, newTodoListTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const endState = todoListsReducer(startState, changeTodolistFilterActionCreator(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
})