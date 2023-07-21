import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Book", isDone: false}
    ],
  });

  let [filter, setFilter] = useState<FilterValuesType>('all');

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todoLists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function removeTask(id: string, todolistId: string) {
    let currentTasks = tasks[todolistId];
    let filteredTasks = currentTasks.filter(t => t.id !== id);
    tasks[todolistId] = filteredTasks;
    setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    let currentTasks = tasks[todolistId];

    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };

    let newTasks = [newTask, ...currentTasks];
    tasks[todolistId] = newTasks;


    setTasks({...tasks});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let currentTasks = tasks[todolistId];
    let task = currentTasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }

  }

  function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    let currentTasks = tasks[todolistId];
    let task = currentTasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle;
      setTasks({...tasks});
    }

  }

  let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "active"},
    {id: todolistId2, title: "What to buy", filter: "completed"}
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoLists = todoLists.filter(tl => tl.id !== todolistId);
    setTodoLists(filteredTodoLists);

    delete tasks[todolistId];
    setTasks({...tasks});
  }
  let changeTodoListTitle = (id: string, newTitle: string) => {
    const todolist = todoLists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }


  const addTodoList = (title: string) => {
    let todoList: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoList.id]: []
    })
  }

  return (
    <div className="App">
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
            <Menu/>
          </IconButton>
          <Typography variant={'h6'}>
            News
          </Typography>
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodoList}></AddItemForm>
        </Grid>
        <Grid container spacing={3} style={{ padding: '10px'}}>
          {
            todoLists.map((tl) => {
              let activeTasks = tasks[tl.id];
              if (tl.filter === 'completed') {
                activeTasks = activeTasks.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                activeTasks = activeTasks.filter(t => t.isDone === false)
              }

              return <Grid item>
                <Paper style={{ padding: '10px'}}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={activeTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

  export default App;
