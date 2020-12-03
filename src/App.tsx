//@ts-nocheck
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import OnOff from './onOff';
import { Todolist, TaskType } from './Todolist';
import { AddItemForm } from './AddItemForm'
import { Paper, Grid, Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'What to buy', filter: 'completed' }
    ]);
    
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "rest api", isDone: true },
            { id: v1(), title: "graphQL", isDone: false }
        ],
        [todoListID2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "bread", isDone: true },
            { id: v1(), title: "Beer", isDone: false }
        ]
    });

    function changeFilter(todoListId: string, value: FilterValueType,) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        // найдём нужную таску:
        let todoList = todoLists.find(tl => tl.id === todoListId);
        //изменим таску, если она нашлась
        if (todoList) {
            todoList.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTodoLists([...todoLists]);
        }
    };

    function removeTodoList(todoListId: string) {
        //достанем нужный массив по todoListId:
         // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        let filteredsetTodoLists = todoLists.filter(tl => tl.id !== todoListId);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTodoLists(filteredsetTodoLists);
        //удалим таски из стейта
        delete tasksObj[todoListId];
       // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasksObj });
    };

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists]);
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    };


    function addTask(title: string, todoListId: string) {
        let task = { id: v1(), title: title, isDone: false };
        //достанем нужный массив по todoListId:
        let tasks = tasksObj[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasksObj })
    };

    function removeTask(id: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        let tasks = tasksObj[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        let filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todoListId] = filteredTasks;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasksObj });
    };

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        //достанем нужный массив по todoListId:
        let tasks = tasksObj[todoListId];
        // найдём нужную таску:
        let task = tasks.find(task => task.id === id)
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({ ...tasksObj })
        }
    };
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        let tasks = tasksObj[todoListId];
        // найдём нужную таску:
        let task = tasks.find(task => task.id === id)
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({ ...tasksObj })
        }
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
                            let taskForTodolist = tasksObj[tl.id];
                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(task => task.isDone === false)
                            };
                            if (tl.filter === 'completed') {
                                taskForTodolist = taskForTodolist.filter(task => task.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={{ padding: "10px" }} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        //tasks={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        collapsed={collapsed}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
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

export default App;
