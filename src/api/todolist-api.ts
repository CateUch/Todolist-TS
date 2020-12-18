import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b748ba77-6052-49e6-ab5b-e3da15aaf5b4'
    }
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
}
);

//api
export const todoListAPI = {
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title })
    },

    updateTodo(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, { title: title })
    },

    deleteTodo(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },

    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    getTasks(todoListId: string) {
        return instance.get<ResponseTaskType<TaskType>>(`todo-lists/${todoListId}/tasks`)
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },

    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, { title: title })
    }
};

//types
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
};
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
};
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
};
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
};
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
};
export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
};
type ResponseTaskType<D = []> = {
    items: Array<D>,
    totalCount: number,
    error: string | null
};

