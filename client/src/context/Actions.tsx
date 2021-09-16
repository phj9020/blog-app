import { User } from "./Context"

export const LoginStart = () => {
    return {
        type: "Login_Start"
    }
}

export const LoginSuccess = (user:User) => {
    return {
        type: "Login_Success",
        payload: user
    }
}

export const LoginFailure = () => {
    return {
        type: "Login_Failure"
    }
}
export const LogOut = () => {
    return {
        type: "Log_Out"
    }
}