import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";
function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    let [filter, setFilter] =useState<FilterValuesType>('all');

    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    }

    let activeTasks = tasks;
    if (filter === 'completed') {
        activeTasks = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        activeTasks = tasks.filter(t => t.isDone === false)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask (title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };

        setTasks([newTask, ...tasks]);
    }
    
    function changeStatus (taskId: string, isDone: boolean) {
        let task = tasks.find(t =>  t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={activeTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
