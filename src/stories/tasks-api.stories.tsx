
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import { todoListAPI } from '../api/todolist-api'


export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodolistId] = useState<string>("");
    const getTasks = () => {
        todoListAPI.getTasks(todoListId).then((res) => {
            setState(res.data.items);
        })
    }
    return <div> <div> {JSON.stringify(state)}</div>
        <input placeholder={"todoListId"} value={todoListId}
            onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
        <button onClick={getTasks}>get task</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodolistId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");

    const createTask = () => {
        todoListAPI.createTask(todoListId, taskTitle).then((res) => {
            setState(res.data.data);
        })
    };
    return <div> <div>{JSON.stringify(state)}</div>
        <input placeholder={"todoListId"} value={todoListId}
            onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
        <input placeholder={"taskTitle"} value={taskTitle}
            onChange={(e) => { setTaskTitle(e.currentTarget.value) }} />
        <button onClick={createTask}>add task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const deleteTask = () => {
        todoListAPI.deleteTask(todoListId, taskId).then((res) => {
            setState(res.data);
        })
    };
    return <div> <div> {JSON.stringify(state)}</div>
        <input placeholder={"todoListId"} value={todoListId}
            onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
        <input placeholder={"taskId"} value={taskId}
            onChange={(e) => { setTaskId(e.currentTarget.value) }} />
        <button onClick={deleteTask}>delete task</button>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadLine] = useState<string>('');

    const updateTask = () => {
        todoListAPI.updateTask(todoListId, taskId, 
            {   title,
                description,
                status,
                priority,
                startDate,
                deadline,
        }
        ).then((res) => {
            setState(res.data);
        })
    };
    return <div> <div> {JSON.stringify(state)}</div>
        <input placeholder={"todoListId"} value={todoListId}
            onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
        <input placeholder={"taskId"} value={taskId}
            onChange={(e) => { setTaskId(e.currentTarget.value) }} />
        <input placeholder={"taskTitle"} value={taskTitle}
            onChange={(e) => { setTaskTitle(e.currentTarget.value) }} />
        <input placeholder={"description"} value={description}
            onChange={(e) => { setDescription(e.currentTarget.value) }} />
        <input placeholder={"status"} value={status} type="number"
            onChange={(e) => { setStatus(+e.currentTarget.value) }} />
        <input placeholder={"priority"} value={priority} type="number"
            onChange={(e) => { setPriority(+e.currentTarget.value) }} />
        <input placeholder={"startDate"} value={'startDate'}
            onChange={(e) => { setStartDate(e.currentTarget.value) }} />
        <input placeholder={"deadLine"} value={'deadLine'}
            onChange={(e) => { setDeadLine(e.currentTarget.value) }} />
        <button onClick={updateTask}>update task</button>
    </div>
}
