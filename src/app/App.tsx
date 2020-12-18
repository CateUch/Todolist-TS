import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from '@material-ui/icons';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';
import TodolistsList from '../features/todolistsList/TodolistsList';
import {Container, AppBar, Toolbar, IconButton, Typography, Button, LinearProgress } from '@material-ui/core';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';

type PropsType = {
    demo?: boolean
}

function App({demo=false}:PropsType) {

const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>

        </>
    )
}

export default App;

