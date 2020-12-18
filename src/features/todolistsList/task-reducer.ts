import { Dispatch } from "react";
import { TasksStateType } from "../../trash/App_temp";
import { AppRootStateType } from '../../app/store';
import { todoListAPI, TaskType } from "../../api/todolist-api";
import { ActionsType } from "./todolist-reducer";
import { AppReducerActionType, setAppErrorAC, setAppStatusAC, SetAppStatusActionType, SetErrorStatusActionType } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

let initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return { ...state, [action.todo.id]: [] };
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todos.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        };
        case "REMOVE-TODOLIST":
            const newState = { ...state };
            delete newState[action.todoListId]
            return newState;
        case "SET-TASKS":
            return { ...state, [action.todoListId]: action.tasks };
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        case "REMOVE-TASK":
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.taskId)
            };
        case "UPDATE-TASK":
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? { ...t, ...action.apiModel } : t)
            }
        default:
            return state;
    }
};

export const addTaskAC = (task: TaskType) =>
    ({ type: "ADD-TASK", task } as const);
export const removeTaskAC = (taskId: string, todoListId: string) =>
    ({ type: "REMOVE-TASK", taskId, todoListId } as const);
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) =>
    ({ type: 'SET-TASKS', tasks, todoListId } as const);
export const updateTaskAC = (taskId: string, apiModel: UpdateTaskDomainModel, todoListId: string) =>
    ({ type: "UPDATE-TASK", taskId, apiModel, todoListId } as const);

export const getTasksTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            handleServerNetworkError(err.message, dispatch)
        })
};
export const addTaskTC = (title: string, todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err.message, dispatch)
        })
};
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err.message, dispatch)
        })
};

export const updateTaskTC = (taskId: string, todoListId: string, domainModel: UpdateTaskDomainModel) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    const tasks = getState().tasks[todoListId];
    const currentTask = tasks.find(t => { return t.id === taskId })



    const apiModel = {
        title: currentTask.title,
        status: currentTask.status,
        deadline: currentTask.deadline,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        description: currentTask.description,
        ...domainModel
    };
    if (currentTask) {
        dispatch(setAppStatusAC('loading'));
        todoListAPI.updateTask(todoListId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todoListId))
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err) => {
                handleServerNetworkError(err.message, dispatch)
            })
    }
};

//types
export type UpdateTaskDomainModel = {
    title?: string
    status?: number
    deadline?: string
    priority?: number
    startDate?: string
    description?: string
};

export type ActionType =
    | ActionsType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    ;

export type ThunkDispatch = Dispatch<ActionType | AppReducerActionType>

