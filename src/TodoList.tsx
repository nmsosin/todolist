import React, {ChangeEvent, KeyboardEvent} from 'react';
import { useState } from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    filter: FilterValuesType,
    removeTodoList: (todolistId: string) => void,
}

function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(evt.currentTarget.value)
    }

    const onKeyPressHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (evt.ctrlKey && evt.key === 'Enter') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }

    const onAllClickHandler = () => { props.changeFilter('all', props.id)};
    const onActiveClickHandler = () => { props.changeFilter('active', props.id)};
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id)};

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div key={'1'}>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ inputChangeHandler }
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error': ''}
                />
                <button onClick={ addTaskHandler } >+</button>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={ onAllClickHandler } >All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={ onActiveClickHandler } >Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={ onCompletedClickHandler } >Completed</button>

            </div>
        </div>
    )
}

export default TodoList;