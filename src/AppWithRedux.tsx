import React, { useCallback, useEffect } from 'react';
import './App.css';
//import OnOff from './onOff';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm'
import { Paper, Grid, Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, addTodoListAC, getTodolistsThunk } from './state/todolist-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskStatuses, TaskType, todoListAPI } from './api/todolist-api';
import { v1 } from 'uuid';
import { addTaskTC, removeTaskTC, updateTaskTC } from './state/task-reducer';


export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
};
export type FilterValueType = 'all' | 'active' | 'completed';


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsThunk());
    }, [])

    const addTask = useCallback(function (title: string, todoListId: string) {
        const thunk = addTaskTC(title, todoListId,);
        debugger
        dispatch(thunk);
    }, []);

    const removeTask = useCallback(function (todoListId: string, id: string) {
        const thunk = removeTaskTC(id, todoListId);
        debugger
        dispatch(thunk);
    }, []);

    const changeTaskStatus = useCallback(function (id: string, todoListId: string, status: TaskStatuses) {
        debugger
        dispatch(updateTaskTC(id, todoListId, { status }))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, todoListId: string, newTitle: string) {
        debugger
        const thunk = (updateTaskTC(id, todoListId, { title: newTitle }));
        dispatch(thunk);
    }, []);

    const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, value));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodoListAC(todoListId);
        dispatch(action);
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title);
        dispatch(action)
    }, [dispatch]);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTask = tasks[tl.id];
                            let tasksForTodolist = allTodolistTask;

                            return <Grid item>
                                <Paper style={{ padding: "10px" }} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeFilter={changeFilter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </>
    )
}

export default AppWithRedux;
