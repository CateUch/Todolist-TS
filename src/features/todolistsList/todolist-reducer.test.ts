//@ts-nocheck
import { todolistsReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, TodolistDomainType, changeTodolistEntityStatusAC } from './todolist-reducer';
import { v1 } from 'uuid';
import { TodoListType, FilterValueType, TasksStateType } from '../trash/App';
import { tasksReducer } from './task-reducer';
import { RequestStatusType } from '../../app/app-reducer';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodolistDomainType> =  [];

beforeEach(() => {
    todoListId1 = v1(),
    todoListId2 = v1(),
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
});

    test('correct todolist should be REMOVEed', () => {
        const endState = todolistsReducer(startState, removeTodoListAC(todoListId1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todoListId2);
    });

    test('correct todolist should be ADDed', () => {
        let newTodolistTitle = "New Todolist";

        let action = addTodoListAC(newTodolistTitle)

        const endState = todolistsReducer(startState, action)

        expect(endState.length).toBe(3);
        expect(endState[0].title).toBe(newTodolistTitle);
    });


    test('new array should be added when new todolist is added', () => {
        const startState: TasksStateType = {
            "todoListId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todoListId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };

        const action = addTodoListAC("new todolist");

        const endState = tasksReducer(startState, action)
        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    });


    test('correct todolist should CHANGE its NAME', () => {

        let newTodolistTitle = "New TodolistName";

        const endState = todolistsReducer(startState, changeTodoListTitleAC(todoListId2, newTodolistTitle));

        expect(endState[0].title).toBe("What to learn");
        expect(endState[1].title).toBe(newTodolistTitle);
    });

    test('correct FILTER of todolist should be changed', () => {
        let newFilter: FilterValueType = "completed";

        const endState = todolistsReducer(startState, changeTodoListFilterAC(todoListId2, newFilter));

        expect(endState[0].filter).toBe("all");
        expect(endState[1].filter).toBe(newFilter);
    });

    test('entityStatus of todolist should be changed', () => {
        let newStatus: RequestStatusType = "loading";

        const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todoListId2, newStatus));

        expect(endState[0].entityStatus).toBe("idle");
        expect(endState[1].entityStatus).toBe(newStatus);
    });
