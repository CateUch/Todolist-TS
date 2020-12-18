import '../../app/App.css';
import { Todolist } from './Todolist/Todolist';
import { AppRootStateType } from '../../app/store';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TaskStatuses, TaskType } from '../../api/todolist-api';
import { addTaskTC, removeTaskTC, updateTaskTC } from './task-reducer';
import { Paper, Grid } from '@material-ui/core';
import { changeTodoListFilterAC, getTodolistsThunk, deleteTodolistTC, createTodolistTC, updateTodolistTC } from './todolist-reducer';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { RequestStatusType } from '../../app/app-reducer';


type PropsType = {
    demo?: boolean
}


const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {

    let dispatch = useDispatch();
    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
    let todolists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists);

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodolistsThunk());
    }, []);

    const addTodoList = useCallback((title: string) => {
        let thunk = createTodolistTC(title);
        dispatch(thunk)
    }, [dispatch]);

    const removeTodoList = useCallback((todoListId: string) => {
        let thunk = deleteTodolistTC(todoListId);
        dispatch(thunk);
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todoListId: string) {
        const thunk = addTaskTC(title, todoListId,);
        dispatch(thunk);
    }, []);

    const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, value));
    }, [dispatch]);

    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(updateTodolistTC(todoListId, newTitle));
        debugger
    }, [dispatch]);

    const changeTaskStatus = useCallback(function (id: string, todoListId: string, status: TaskStatuses) {
        dispatch(updateTaskTC(id, todoListId, { status }))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, todoListId: string, newTitle: string) {
        const thunk = (updateTaskTC(id, todoListId, { title: newTitle }));
        dispatch(thunk);
    }, []);

    const removeTask = useCallback(function (todoListId: string, id: string) {
        const thunk = removeTaskTC(id, todoListId);
        dispatch(thunk);
    }, []);

    return (
        <>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodoList} entityStatus={"idle"} />
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTask = tasks[tl.id];
                        let tasksForTodolist = allTodolistTask;

                        return <Grid item>
                            <Paper style={{ padding: "10px" }} elevation={3}>
                                <Todolist
                                    id={tl.id}
                                    key={tl.id}
                                    demo={demo}
                                    title={tl.title}
                                    addTask={addTask}
                                    filter={tl.filter}
                                    removeTask={removeTask}
                                    tasks={tasksForTodolist}
                                    changeFilter={changeFilter}
                                    entityStatus={tl.entityStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}


//types
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
    entityStatus: RequestStatusType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
};
export type FilterValueType = 'all' | 'active' | 'completed'

export default TodolistsList;