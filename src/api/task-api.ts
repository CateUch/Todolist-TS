import axios from 'axios';

type TaskType= {
    description: string,
    title: string,
    completed: boolean,
    status: boolean,
    priority: string
    startDate: null,
    deadline: null,
    id: string,
    todoListId: string,
    order: null,
    addedDate: null
 };

 type ResponseType<T> = {
    items: TaskType[],
    totalCount: number
    error: string
 }

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b748ba77-6052-49e6-ab5b-e3da15aaf5b4'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
    }
 )
 
export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
    },

    // createTodo (title: string) {
    //     return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title: title})
    // },

    // deleteTodo (todolistId: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    // },
    //  updateTodo (todolistId: string, title: string) {
    //      return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    //  },

}