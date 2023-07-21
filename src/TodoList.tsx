import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType,
    removeTodoList: (todolistId: string) => void,
    changeTodoListTitle: (id: string, newTitle: string) => void,
}

export default function TodoList(props: PropsType) {
    const onAllClickHandler = () => { props.changeFilter('all', props.id)};
    const onActiveClickHandler = () => { props.changeFilter('active', props.id)};
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id)};

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }

    return (
        <div key={'1'}>
            <h3><EditableTitle title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} ></AddItemForm>
            <div>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                       onChange={onChangeStatusHandler}
                                       checked={t.isDone}/>
                                <EditableTitle title={t.title} onChange={onChangeTitleHandler}></EditableTitle>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button
                  color={'primary'}
                  variant={props.filter === 'all' ? 'contained' : 'text' }
                  onClick={ onAllClickHandler } >All</Button>
                <Button
                  color={'secondary'}
                  variant={props.filter === 'active' ? 'contained' : 'text'}
                  onClick={ onActiveClickHandler } >Active</Button>
                <Button
                  color={'success'}
                  variant={props.filter === 'completed' ? 'contained' : 'text'}
                  onClick={ onCompletedClickHandler } >Completed</Button>

            </div>
        </div>
    )
}

