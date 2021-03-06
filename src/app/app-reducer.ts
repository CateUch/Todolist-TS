
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
   status: RequestStatusType
   error: string | null
}

const initialState: InitialStateType = {
   status: 'loading',
   error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
           return {...state, status: action.status};
      case 'APP/SET-ERROR':
            return {...state, error: action.error};
            
       default:
           return state
   }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)


export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

//types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetErrorStatusActionType = ReturnType<typeof setAppErrorAC>
         
export type AppReducerActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
