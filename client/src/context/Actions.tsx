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

export const UpdateUserStart = () => {
    return {
        type: "Update_User_Start",
    }
}
export const UpdateUserSuccess = (user:User) => {
    return {
        type: "Update_User_Success",
        payload: user
    }
}

export const UpdateUserFailure = () => {
    return {
        type: "Update_User_Failure",
    }
}