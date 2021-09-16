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
                isFetching: true,
                error: true,
            }
        default :
            return state
    }
}

export default Reducer;