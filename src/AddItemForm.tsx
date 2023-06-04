import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={'error-message'}>Field is required</div>}
    </div>
}