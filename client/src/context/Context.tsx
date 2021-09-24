import React, { useReducer, Dispatch, useContext, useEffect } from "react";
import Reducer from "./Reducer";

export interface User {
    _id: string,
    username: string,
    email: string,
    profilePic: string,
    posts: [],
    createdAt: string,
    updatedAt: string,
}

export interface State {
    user: User | null;
    isFetching: boolean;
    error: boolean;
}

const temp = localStorage.getItem('user');

const INITIAL_STATE = {
    user: temp ? JSON.parse(temp) : null,
    isFetching: false,
    error: false,
};

export type Action = {type: "Login_Start"} 
| {type: "Login_Success"; payload: User | null} 
| {type: "Login_Failure"}
| {type: "Log_Out"}
| {type: "Update_User"; payload: User | null}


type TDispatch = Dispatch<Action>;

const Context = React.createContext(INITIAL_STATE);
const DispatchContext = React.createContext<TDispatch | null>(null);

export const ContextProvider = ({children} : { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user]);
    
    return(
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </Context.Provider>
    )
}
export function useContextState() {
    const state = useContext(Context);
    if (!state) throw new Error('Cannot find Provider'); 
    return state;
}

export function useDispatch() {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Cannot find Provider');
    return dispatch;
}