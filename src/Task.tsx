import React, { ChangeEvent, useCallback } from 'react';
import { IconButton, Checkbox } from '@material-ui/core';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@material-ui/icons';
import { TaskType } from './Todolist';

export type TaskPropsType = {
    task: TaskType
    onChangeStatusHandler: (taskID: string, event: boolean) => void
    onChangeTitleHandler: (taskID: string, title: string) => void
    onClickRemove: (id: string) => void
    todoListID: string
    
};

export const Task = React.memo((props: TaskPropsType) => {

    let { id, title, isDone } = props.task;

    let onChangeTitleHandler = useCallback((title: string) => props.onChangeTitleHandler(id, title), [props]);
    let onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => props.onChangeStatusHandler(id, event.currentTarget.checked), [props]);
    let onClickRemove = useCallback(() => props.onClickRemove(id), [props]);

    return (
        <div key={id}
            className={isDone ? 'is-done' : ''}>
            <Checkbox
                color={'primary'}
                checked={isDone}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan title={title}
                onChange={onChangeTitleHandler} />
            <IconButton onClick={onClickRemove} >
                <Delete />
            </IconButton>
        </div>

    )
}
)