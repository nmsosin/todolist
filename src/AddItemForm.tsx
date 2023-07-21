import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export function AddItemForm (props: AddItemFormPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(evt.currentTarget.value)
    }

    const onKeyPressHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (evt.ctrlKey && evt.key === 'Enter') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField
          variant="outlined"
          label={"Enter the title"}
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          error={!!error}
          helperText={error}
        />
        <IconButton
          onClick={addTaskHandler}
          color={'primary'} >
            <ControlPoint />
        </IconButton>
    </div>
}