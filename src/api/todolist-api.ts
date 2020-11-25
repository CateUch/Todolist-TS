import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
};

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
export type TaskType = {
    description: string,
    title: string,
    status: number,
    priority: number
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
};
type ResponseTaskType<D = []> = {
    items: Array<D>,
    totalCount: number,
    error: string | null
}

type UpdateTaskModel = {
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadLine: string
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

export const todoListAPI = {
    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title })
    },

    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title })
    },

    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, { title: title })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<TaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}