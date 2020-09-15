import React, { useCallback } from 'react';
import './App.css';
//import OnOff from './onOff';
import { Todolist, TaskType } from './Todolist';
import { AddItemForm } from './AddItemForm'
import { Paper, Grid, Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, addTodoListAC } from './state/todolist-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './state/store';

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

    const changeFilter = useCallback((todoListID: string, value: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListID, value));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(todoListID, newTitle));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID);
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
                                        todolist={tl}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
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
