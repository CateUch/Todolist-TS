import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todoListAPI } from './todolist-api'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b748ba77-6052-49e6-ab5b-e3da15aaf5b4'
    }
};


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodo().then((res) => {
            setState(res.data);
        }
        )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodo('SOME TITLE').then((res) => {
            setState(res.data.data);
        }
        )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.deleteTodo("687792ea-d2fa-4892-893a-e0585f9c0d72").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.updateTodo("687792ea-d2fa-4892-893a-e0585f9c0d72", "ANOTHER ONE TITLE").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
