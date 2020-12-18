import { Dispatch } from "react";
import { TodolistType, todoListAPI } from "../../api/todolist-api";
import { AppReducerActionType, RequestStatusType, setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { FilterValueType } from "./TodolistsList";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todos.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));

        case "ADD-TODOLIST":
            return [{ ...action.todo, filter: 'all', entityStatus: 'idle' }, ...state];

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl);

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);

        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId);
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoListId ? { ...tl, entityStatus: action.entityStatus } : tl);

        default:
            return state;
    }
};

//actions
export const addTodoListAC = (todo: TodolistType) =>
    ({ type: "ADD-TODOLIST", todo } as const);
export const removeTodoListAC = (id: string) =>
    ({ type: "REMOVE-TODOLIST", todoListId: id } as const);
export const setTodoListsAC = (todos: Array<TodolistType>) =>
    ({ type: 'SET-TODOLISTS', todos } as const);
export const changeTodoListTitleAC = (id: string, title: string) =>
    ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const);
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) =>
    ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const);
export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => 
    ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", todoListId, entityStatus } as const)

//thunks

export const getTodolistsThunk = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.getTodo()
        .then((res) => {
            //2.dispatch actions
            dispatch(setTodoListsAC(res.data));
            dispatch(setAppStatusAC('succeeded'))
        })
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const todo = res.data.data.item
                dispatch(addTodoListAC(todo))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err.message, dispatch)
        })
};

export const deleteTodolistTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"))
    todoListAPI.deleteTodo(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
    .catch((err) => {
        handleServerNetworkError(err.message, dispatch)
    })
};

export const updateTodolistTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.updateTodo(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todoListId, title))
            dispatch(setAppStatusAC('succeeded'))
        }  else {
            handleServerAppError(res.data, dispatch)
        }
    })
    .catch((err) => {
        handleServerNetworkError(err.message, dispatch)
    })
};



//types
export type ActionsType =
    | AppReducerActionType
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    ;
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType,
    entityStatus: RequestStatusType
}
