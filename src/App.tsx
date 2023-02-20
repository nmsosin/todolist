import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";
function App() {
    let initialTasks = [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]
    console.log(initialTasks)

    let [tasks, setTasks] = useState<Array<TaskType>>(initialTasks);
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

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={activeTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
