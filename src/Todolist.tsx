import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValueType } from './App';
import { EditableSpan } from './EditableSpan';
import { Checkbox } from '@material-ui/core';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (todoListID: string, value: FilterValueType) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
    collapsed: boolean
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    debugger;
    let listOfTasks = props.tasks.map(task => {
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
        }
        const onChangeTitleHandler = (value: string) => {
            props.changeTaskTitle(task.id, value, props.id)
        }
        return (
            <div key={task.id}
                className={(props.filter !== 'completed' && task.isDone) ? 'is-done' : ''}>
                <Checkbox
                    color={'primary'}
                    checked={task.isDone}
                    onChange={onChangeStatusHandler}
                />

                {/* <input type='checkbox'
                    checked={task.isDone}
                    onChange={onChangeStatusHandler} /> */}
                <EditableSpan title={task.title}
                    onChange={onChangeTitleHandler} />
                {/* <button onClick={() => { props.removeTask(task.id, props.id) }}>X</button> */}
                <IconButton onClick={() => { props.removeTask(task.id, props.id) }} >
                    <Delete />
                </IconButton>
            </div>
        );
    });

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const onAllFilterOnclick = () => { props.changeFilter(props.id, 'all') };

    const onActiveFilterOnclick = () => { props.changeFilter(props.id, 'active') };
    const onCompletFilterOnclick = () => { props.changeFilter(props.id, 'completed') };
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }

    return <div>
        <h1>
            <EditableSpan title={props.title} onChange={changeTodoListTitle} />
            {/* <button onClick={removeTodoList}>X</button></h1> */}
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h1>
        <AddItemForm addItem={addTask} />
        <div >
            <h2 className='list'>list of tasks</h2>
            {props.collapsed && listOfTasks}
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllFilterOnclick} color={"default"} >All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveFilterOnclick}
                color={'default'} >Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletFilterOnclick}
                color={'default'} >Completed</Button>
        </div>
    </div>
};


