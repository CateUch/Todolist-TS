import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValueType, TodoListType } from './App';
import { EditableSpan } from './EditableSpan';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getTasksTC} from './state/task-reducer';
import { Task } from './Task';
import { TaskStatuses, TaskType } from './api/todolist-api';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todoListId: string, value: FilterValueType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, todoListId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, todoListId: string, newTitle: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, title: string) => void
    filter: FilterValueType
 }

export const Todolist = React.memo((props: PropsType) => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, []    )


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    // const onClickRemove = useCallback((taskId: string) => dispatch(removeTaskAC(taskId, props.id)), []);
    // const onChangeStatusHandler = useCallback((taskId: string, event: TaskStatuses) => dispatch(changeTaskStatusAC(taskId, event, props.id)), [])
    // const onChangeTitleHandler = useCallback((taskId: string, value: string) => dispatch(changeTaskTitleAC(taskId, value, props.id)), [])

    let taskForTodolist = props.tasks;
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => task.status ===  TaskStatuses.New)
    };
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    };


    const onAllFilterOnclick = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id]);
    const onActiveFilterOnclick = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id]);
    const onCompletFilterOnclick = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id]);

    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.changeFilter, props.id]);
    const changeTodoListTitle = useCallback((newTitle: string) => { props.changeTodoListTitle(newTitle, props.id)
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
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todoListId={props.id}
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

