import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { IconButton, Checkbox } from '@material-ui/core';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@material-ui/icons';
import { TaskStatuses, TaskType } from './api/todolist-api';


export type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (id: string, todoListId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    removeTask: (taskId: string, todoListId: string) => void
};


export const Task = React.memo((props: TaskPropsType) => {

    let onChangeTitleHandler = useCallback((title: string) => props.changeTaskTitle(props.task.id, props.todoListId, title), [props.task.id, props.todoListId]);

    let onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, props.todoListId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.task.id, props.todoListId])

    let onClickRemove = useCallback(() => props.removeTask(props.task.id, props.todoListId), [props.task.id, props.todoListId])

    return (
        <div key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title}
                onChange={onChangeTitleHandler} />
            <IconButton onClick={onClickRemove} >
                <Delete />
            </IconButton>
        </div>

    )
}
)