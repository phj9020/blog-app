import { Action, State } from "./Context"

const Reducer = (state:State, action:Action) : State => {
    switch(action.type) {
        case "Login_Start" :
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false,
            }
        case "Login_Success":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "Login_Failure":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true,
            }
        case "Log_Out":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            }
        case "Update_User_Start" :
            return {
                ...state,
                isFetching: true,
            }
        case "Update_User_Success": 
            return {
                ...state,
                user:action.payload,
                isFetching: false,
                error: false,
            }
        case "Update_User_Failure":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            }
        default :
            return state;
    }
}

export default Reducer;