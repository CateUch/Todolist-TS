//@ts-nocheck
import React, { useState, useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import OnOff from '../onOff';
import { Todolist, TaskType } from '../Todolist';
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { Paper, Grid, Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { todolistsReducer, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, addTodoListAC } from '../state/todolist-reducer';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../state/task-reducer';


export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed';

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();
//@ts-ignore
    let [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' }
    ]);

    let [tasksObj, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "rest api", isDone: true },
            { id: v1(), title: "graphQL", isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "bread", isDone: true },
            { id: v1(), title: "Beer", isDone: false }
        ]
    });

    function changeFilter(todoListId: string, value: FilterValueType,) {
        dispatchTodolists(changeTodoListFilterAC(todoListId, value));
    };

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        dispatchTodolists(changeTodoListTitleAC(todoListId, newTitle));
    };

    function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId);
        dispatchTodolists(action);
        dispatchTasks(action);
    };

    function addTodoList(title: string) {
        let action = addTodoListAC(title);
        dispatchTodolists(action);
        dispatchTasks(action);
    };


    function addTask(title: string, todoListId: string) {
        let action = addTaskAC(title, todoListId);
        dispatchTasks(action);
    };

    function removeTask(id: string, todoListId: string) {
        let action = removeTaskAC(id, todoListId);
        dispatchTasks(action);
    };

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchTasks(changeTaskStatusAC(id, isDone, todoListId));
    };

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todoListId))
    };

    let [collapsed, setCollapsed] = useState<boolean>(true);
    console.log('collapsed = ' + collapsed);


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
                        todoLists.map(tl => {
                            // let taskForTodolist = tasks[tl.id];
                            // if (tl.filter === 'active') {
                            //     taskForTodolist = taskForTodolist.filter(task => task.isDone === false)
                            // };
                            // if (tl.filter === 'completed') {
                            //     taskForTodolist = taskForTodolist.filter(task => task.isDone === true)
                            // }
                            ;
                            return <Grid item>
                                <Paper style={{ padding: "10px" }} elevation={3}>
                                    {/* <Todolist
                                        key={tl.id}
                                        //id={tl.id}
                                        //title={tl.title}
                                        //removeTask={removeTask}
                                        //addTask={addTask}
                                        //changeTaskTitle={changeTaskTitle}
                                        changeFilter={changeFilter}
                                        //filter={tl.filter}
                                        collapsed={collapsed}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    /> */}
                                </Paper>
                            </Grid>
                        })
                    }

                    {/* <Grid container>
                <OnOff onClick={setCollapsed} />
                </Grid> */}
                </Grid>
            </Container>

        </>
    )
}

export default AppWithReducers;
