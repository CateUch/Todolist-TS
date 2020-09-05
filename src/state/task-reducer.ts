import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { addTodoListActionType, removeTodoListActionType } from "./todolist-reducer";
import { TaskType } from "../Todolist";

export type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addTodoListActionType | removeTodoListActionType

export type removeTaskACType = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}

export type addTaskACType = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type changeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    todoListID: string
    taskID: string
    isDone: boolean
}
export type changeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE"
    title: string
    todoListID: string
    taskID: string
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todoListID];
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todoListID] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            let task = { id: v1(), title: action.title, isDone: false };
            return { ...state, [action.todoListID]: [task, ...state[action.todoListID]] };
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, 
                [action.todoListID]: changeTitleAndStatus(state[action.todoListID], action.taskID, action.isDone)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, 
                [action.todoListID]: changeTitleAndStatus(state[action.todoListID], action.taskID, action.title)
            }
        case "ADD-TODOLIST":
            console.log('you are here')
            return {
                ...state,
                [action.todoListID]: []
            };
            
        case "REMOVE-TODOLIST":
            const newState = { ...state };
            delete newState[action.todoListID]
            return newState;
        default:
            throw new Error("I do not understand this type")
    };
}

export const removeTaskAC = (taskID: string, todoListID: string): removeTaskACType => {
    return { type: "REMOVE-TASK", taskID, todoListID }
};
export const addTaskAC = (title: string, todoListID: string): addTaskACType => {
    return { type: "ADD-TASK", title, todoListID }
};
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusACType => {
    return { type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID }
};
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleACType => {
    return { type: "CHANGE-TASK-TITLE", taskID, title, todoListID }
};

let changeTitleAndStatus = (tasks:Array<TaskType>, taskID: string, property: string | boolean): Array<TaskType> => {
    let propertyName = typeof property === "string" ? 'title' : 'isDone';
    return [...tasks.map(task => {
        if (task.id !== taskID) {
            return task
        } else {
            return { ...task, [propertyName]: property }
        }
    })]
    }

