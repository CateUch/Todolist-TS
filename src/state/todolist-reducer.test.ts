import { todolistsReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC } from './todolist-reducer';
import { v1 } from 'uuid';
import { TodoListType, FilterValueType, TasksStateType } from '../App';
import { tasksReducer } from './task-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType> = [];

beforeEach(() => {
    todolistId1 = v1(),
    todolistId2 = v1(),
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
});


    test('correct todolist should be REMOVEed', () => {
        const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistId2);
    });

    test('correct todolist sh ould be ADDed', () => {
        let newTodolistTitle = "New Todolist";

        let action = addTodoListAC(newTodolistTitle)

        const endState = todolistsReducer(startState, action)

        expect(endState.length).toBe(3);
        expect(endState[2].title).toBe(newTodolistTitle);
    });


    test('new array should be added when new todolist is added', () => {
        const startState: TasksStateType = {
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };

        const action = addTodoListAC("new todolist");

        const endState = tasksReducer(startState, action)
        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    });


    test('correct todolist should CHANGE its NAME', () => {

        let newTodolistTitle = "New TodolistName";

        const endState = todolistsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

        expect(endState[0].title).toBe("What to learn");
        expect(endState[1].title).toBe(newTodolistTitle);
    });

    test('correct FILTER of todolist should be changed', () => {
        let newFilter: FilterValueType = "completed";

        const endState = todolistsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

        expect(endState[0].filter).toBe("all");
        expect(endState[1].filter).toBe(newFilter);
    });
