import React, {ChangeEvent, KeyboardEvent} from 'react';
import { useState } from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}

function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(evt.currentTarget.value)
    }

    const onKeyPressHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.ctrlKey && evt.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTaskHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => { props.changeFilter('all')};
    const onActiveClickHandler = () => { props.changeFilter('active')};
    const onCompletedClickHandler = () => { props.changeFilter('completed')};

    return (
        <div key={'1'}>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ inputChangeHandler }
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={ addTaskHandler } >+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={ onAllClickHandler } >All</button>
                <button onClick={ onActiveClickHandler } >Active</button>
                <button onClick={ onCompletedClickHandler } >Completed</button>

            </div>
        </div>
    )
}

export default TodoList;