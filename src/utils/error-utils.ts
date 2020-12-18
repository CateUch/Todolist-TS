import { setAppErrorAC, setAppStatusAC, AppReducerActionType } from '../app/app-reducer';
import { ResponseType } from '../api/todolist-api';
import { Dispatch } from 'react';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:Dispatch<AppReducerActionType> ) => {
   if (data.messages.length) {
       dispatch(setAppErrorAC(data.messages[0]))
   } else {
       dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<AppReducerActionType>) => {
   dispatch(setAppErrorAC(error.message ? error.message: 'Some network error'))
   dispatch(setAppStatusAC('failed'))
}


