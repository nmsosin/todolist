import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableTitlePropsType = {
    title: string,
    onChange: (newValue: string) => void,
}

export function EditableTitle(props: EditableTitlePropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField
            variant="standard"
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode} >{props.title}</span>
}