import { TodoListType, FilterValueType } from "../App";
import {todoListAPI, TodolistType} from '../api/todolist-api'
import { v1 } from "uuid";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";

export type ActionsType = removeTodoListActionType | addTodoListActionType | changeTodoListTitleActionType | changeTodoListFilterActionType | SetTodoListAC

export type removeTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type addTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
type changeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type changeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}
export type SetTodoListAC = ReturnType<typeof setTodoListsAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

const initialState: Array<TodolistDomainType> =  [];


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType>  => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            });

        case "REMOVE-TODOLIST":
        return state.filter(tl => tl.id !== action.todoListId);
        case "ADD-TODOLIST":
           return [{
                id: action.todoListId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case "CHANGE-TODOLIST-TITLE":
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return[...state];
            }
                return state;
        case "CHANGE-TODOLIST-FILTER":{
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return[...state];
            }
                return state;
        }
        default:
           return state;
}}

export const removeTodoListAC = (id: string) : removeTodoListActionType=> {
    return {type:"REMOVE-TODOLIST", todoListId: id}
};
export const addTodoListAC = (title: string) : addTodoListActionType=> {
    return {type:"ADD-TODOLIST", title: title, todoListId: v1()}
};
export const changeTodoListTitleAC = (id: string, title: string) : changeTodoListTitleActionType=> {
    return {type:"CHANGE-TODOLIST-TITLE", id: id, title: title}
};
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) : changeTodoListFilterActionType=> {
    return {type:"CHANGE-TODOLIST-FILTER", id: id, filter: filter}
};
export const setTodoListsAC = (todos: Array<TodolistType>) => ({ type: 'SET-TODOLISTS', todos } as const);
//@ts-ignore
export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    //1. ajax reqest
    todoListAPI.getTodo()
        .then((res) => {
            //2.dispatch actions
            dispatch(setTodoListsAC(res.data))
        })
}
