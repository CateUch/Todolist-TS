import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, TextField, IconButton  } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };
    const onEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) { addItemClick(); }
    };

    const addItemClick = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
        } else {
            setError('Title is required');
        }
        setTitle('');
    };

    return <div onBlur={() =>setError(null)}>
        <TextField
            variant={"outlined"}
            value={title}
            onChange={onTitleChange}
            onKeyPress={onEnterKeyPress}
            error={!!error}
            label={"Title"}
            helperText={error}
        />
        {/* <input
            value={title}
            onChange={onTitleChange}
            onKeyPress={onEnterKeyPress}
            className={error ? 'error' : ''} /> */}
            <IconButton color={"primary"} onClick={addItemClick} >
                <AddBox />
            </IconButton>

        {/* <Button variant={'contained'} color={'primary'} onClick={onAddTaskClick}>+</Button> */}
        {/* <button onClick={onAddTaskClick}>add new task</button>*/}                                        
    </div>;
}
