import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import { Task } from '../Task';


export default {
    title: 'Todolist/Task Stories',
    component: Task
} as Meta;


const onChangeStatusHandler = action('Change Status');
const onClickRemove = action('Remove Task');
const onChangeTitleHandler = action('Change Title');


export const TaskDoneStoryBook = (props: any) => {
    return (        <Task
            task={{ id:'1', isDone: true, title: 'css' }}
            onChangeStatusHandler={onChangeStatusHandler}
            onChangeTitleHandler={onChangeTitleHandler}
            onClickRemove={onClickRemove}
            todoListID={'todolist1'}
        />
    )
};

export const TaskActiveStoryBook = (props: any) => {
    return (        <Task
            task={{ id:'1', isDone: false, title: 'js' }}
            onChangeStatusHandler={onChangeStatusHandler}
            onChangeTitleHandler={onChangeTitleHandler}
            onClickRemove={onClickRemove}
            todoListID={'todolist2'}
        />
    )
}