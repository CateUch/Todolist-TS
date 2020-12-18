import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { TextField, IconButton  } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { RequestStatusType } from '../../app/app-reducer';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus: RequestStatusType
}

export const AddItemForm  = React.memo((props: AddItemFormPropsType) => {
console.log('AddItemForm')
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
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
            disabled={props.entityStatus === "loading"}
        />
             <IconButton color={"primary"} onClick={addItemClick} disabled={props.entityStatus === "loading"}>
                <AddBox />
            </IconButton>                                  
    </div>;
})
