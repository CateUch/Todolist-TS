import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValueType, TodoListType } from './App';
import { EditableSpan } from './EditableSpan';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, addTaskAC } from './state/task-reducer';
import { Task } from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    todolist: TodoListType
    tasks: Array<TaskType>
    filter: FilterValueType
    title: string
    changeFilter: (todoListID: string, value: FilterValueType) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
 }

export const Todolist = React.memo((props: PropsType) => {

    let dispatch = useDispatch();

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.id)), [dispatch, props.id])

    const onClickRemove = useCallback((taskID: string) => dispatch(removeTaskAC(taskID, props.id)), []);
    const onChangeStatusHandler = useCallback((taskID: string, event: boolean) => dispatch(changeTaskStatusAC(taskID, event, props.id)), [])
    const onChangeTitleHandler = useCallback((taskID: string, value: string) => dispatch(changeTaskTitleAC(taskID, value, props.id)), [])

    let taskForTodolist = props.tasks;
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => task.isDone === false)
    };
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => task.isDone === true)
    };


    const onAllFilterOnclick = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id]);
    const onActiveFilterOnclick = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id]);
    const onCompletFilterOnclick = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id]);
    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.changeFilter, props.id]);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }, [props.changeTodoListTitle, props.id]);

    return <div>
        <h1>
            <EditableSpan title={props.title} onChange={changeTodoListTitle} />
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h1>
        <AddItemForm addItem={addTask} />
        <div >
            <h2 className='list'>list of tasks</h2>
            {taskForTodolist.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    onClickRemove={onClickRemove}
                    onChangeStatusHandler={onChangeStatusHandler}
                    onChangeTitleHandler={onChangeTitleHandler}
                />
            )}
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
}
)

