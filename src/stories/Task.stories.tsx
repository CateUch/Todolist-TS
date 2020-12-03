import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import { Task } from '../Task';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';


export default {
    title: 'Todolist/Task Stories',
    component: Task
} as Meta;


const onChangeStatusHandler = action('Change Status');
const onClickRemove = action('Remove Task');
const onChangeTitleHandler = action('Change Title');


export const TaskDoneStoryBook = (props: any) => {
    return (        <Task
            task={{id: '1', status: TaskStatuses.Completed, title: "CSS", todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
            changeTaskStatus={onChangeStatusHandler}
            changeTaskTitle={onChangeTitleHandler}
            removeTask={onClickRemove}
            todoListId={"todolistId1"}
        />
    )
};

export const TaskActiveStoryBook = (props: any) => {
    return (        <Task
            task={{id: '2', status: TaskStatuses.New, title: "JS", todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
            changeTaskStatus={onChangeStatusHandler}
            changeTaskTitle={onChangeTitleHandler}
            removeTask={onClickRemove}
            todoListId={"todolistId2"}
        />
    )
}