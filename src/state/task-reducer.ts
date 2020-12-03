import { v1 } from "uuid";
import { AppRootStateType } from './store';
import { TasksStateType } from "../App";
import { addTodoListActionType, removeTodoListActionType, SetTodoListAC } from "./todolist-reducer";
// import { TaskType } from "../Todolist";
import { Dispatch } from "react";
import { todoListAPI, TaskPriorities, TaskStatuses, TaskType } from "../api/todolist-api";

export type ActionType = removeTaskACType | addTaskACType | updateTaskACType | changeTaskTitleACType | addTodoListActionType | removeTodoListActionType | SetTodoListAC | SetTasksAC

export type removeTaskACType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}

export type addTaskACType = {
    type: "ADD-TASK"
    task: TaskType
}
export type updateTaskACType = {
    type: "UPDATE-TASK"
    todoListId: string
    taskId: string
    apiModel: UpdateTaskDomainModel
}
export type changeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE"
    title: string
    todoListId: string
    taskId: string
}

export type SetTasksAC = ReturnType<typeof setTasksAC>

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case "UPDATE-TASK": {
            let todolistTasks = state[action.todoListId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, ...action.apiModel } : t);

            state[action.todoListId] = newTasksArray;
            return ({ ...state });
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todoListId];
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

            state[action.todoListId] = newTasksArray;
            return ({ ...state });
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]: []
            };

        case "REMOVE-TODOLIST":
            const newState = { ...state };
            delete newState[action.todoListId]
            return newState;
        default:
            return state;

        case "SET-TASKS":
            const stateCopy = { ...state }
            stateCopy[action.todoListId] = action.tasks
            return stateCopy;
    }

};


export const removeTaskAC = (taskId: string, todoListId: string): removeTaskACType => {
    return { type: "REMOVE-TASK", taskId, todoListId }
};
export const addTaskAC = (task: TaskType): addTaskACType => {
    return { type: "ADD-TASK", task }
};
export const updateTaskAC = (taskId: string, apiModel: UpdateTaskDomainModel, todoListId: string): updateTaskACType => {
    return { type: "UPDATE-TASK", taskId, apiModel, todoListId }
};
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): changeTaskTitleACType => {
    return { type: "CHANGE-TASK-TITLE", taskId, title, todoListId }
};

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => ({ type: 'SET-TASKS', tasks, todoListId } as const);
//@ts-ignore
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.getTasks(todoListId)
        .then((res) =>
            dispatch(setTasksAC(res.data.items, todoListId)))
}
//@ts-ignore
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            debugger
            dispatch(removeTaskAC(taskId, todoListId))
        })
}
//@ts-ignore
export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.createTask(todoListId, title)
        .then((res) => {
            debugger
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type UpdateTaskDomainModel = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

//@ts-ignore
export const updateTaskTC = (taskId: string, todoListId: string, domainModel: UpdateTaskDomainModel) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
debugger
    const tasks = getState().tasks[todoListId];
    const currentTask = tasks.find(t => {
        return t.id === taskId
    })

    const apiModel = {
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline,
        ...domainModel
    }
    if (currentTask) {
        todoListAPI.updateTask(todoListId, taskId, apiModel)
        .then((res) => {
            dispatch(updateTaskAC(taskId, domainModel, todoListId))
        })
    }
}




// let changeTitleAndStatus = (tasks: Array<TaskType>, taskId: string, property: string | boolean): Array<TaskType> => {
//     let propertyName = typeof property === "string" ? 'title' : 'isDone';
//     return [...tasks.map(task => {
//         if (task.id !== taskId) {
//             return task
//         } else {
//             return { ...task, [propertyName]: property }
//         }
//     })]
// }

