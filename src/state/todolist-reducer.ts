import { TodoListType, FilterValueType } from "../App";
import { v1 } from "uuid";

export type ActionType = removeTodoListActionType | addTodoListActionType | changeTodoListTitleActionType | changeTodoListFilterActionType

export type removeTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type addTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
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
 
export const todolistsReducer = (state: Array<TodoListType>, action: ActionType  ) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
        return state.filter(tl => tl.id !== action.todoListID);
        case "ADD-TODOLIST":
            let newTodoList: TodoListType = {
                id: action.todoListID,
                filter: 'all',
                title: action.title
            };
        return [...state, newTodoList];
        case "CHANGE-TODOLIST-TITLE":
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return[...state];
            }
                return state;
        case "CHANGE-TODOLIST-FILTER":
            let todoList2 = state.find(tl => tl.id === action.id);
            if (todoList2) {
                todoList2.filter = action.filter;
                return[...state];
            }
                return state;
        default:
            throw new Error("I do not understand this type")
    }
}

export const removeTodoListAC = (id: string) : removeTodoListActionType=> {
    return {type:"REMOVE-TODOLIST", todoListID: id}
};
export const addTodoListAC = (title: string) : addTodoListActionType=> {
    return {type:"ADD-TODOLIST", title: title, todoListID: v1()}
};
export const changeTodoListTitleAC = (id: string, title: string) : changeTodoListTitleActionType=> {
    return {type:"CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) : changeTodoListFilterActionType=> {
    return {type:"CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}