import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import {sharedButton} from '../sharedStyle';
import {Link, useLocation} from 'react-router-dom';
import { IRegisterStateType } from '../type';
import { useDispatch, useContextState } from '../context/Context';
import axios from 'axios';


const LoginContainer = styled.div`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:linear-gradient(
        rgba(255, 255, 255,0.6), 
        rgba(255, 255, 255,0.6)
    ),
    url("https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_1280.jpg") no-repeat center center;
    background-size: cover;
    position:relative;

    .errorMessage {
        font-size: 12px;
        color: red;
        margin-top:10px;
    }
`

const LoginTitle = styled.span`
    font-size: 26px;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 20vw;
    min-width: 270px;

    > label {
        font-family: 'Lora', serif;
        margin: 15px 0px;
    }

    > input {
        border:none;
        border-radius: 4px;
        color:gray;
        padding: 10px;
        :focus {
            outline: none;
        }
    }
`

const LoginButton =styled.button`
    margin-top: 15px;
    background-color: teal;
    ${sharedButton}
`

const RegisterButton = styled.button`
    width: 80px;
    position:absolute;
    right: 15px;
    top: 10px;
    ${sharedButton}
    background-color: #002366;
    
    a {
        text-decoration: none;
        color:inherit;
    }
`

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    let history = useHistory();
    
    let {state:stateFromRegister} = useLocation<IRegisterStateType>();
    const dispatch = useDispatch();
    const state = useContextState();
    
    useEffect(() =>{
        if(stateFromRegister) {
            setEmail(stateFromRegister.email);
            setPassword(stateFromRegister.password);
        }
    },[stateFromRegister])

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({type:"Login_Start"});
        try {
            const res = await axios.post("https://hj-blog-app.herokuapp.com/api/auth/login", {email, password});
            dispatch({type:"Login_Success", payload: res.data});
            history.push("/");
        } catch (error: any) {
            dispatch({type:"Login_Failure"});
            setError(error.response.data);
        }
    };

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        setError("")
        if(event.target.type ==="email") {
            setEmail(event.target.value);
        } else if(event.target.type === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" placeholder="이메일을 입력하세요" required autoComplete="off" onChange={handleOnChange} value={email} />
                <label>Password</label>
                <input type="password" placeholder="비밀번호를 입력하세요" required autoComplete="off" onChange={handleOnChange} value={password} />
                <LoginButton type="submit" disabled={state.isFetching}>로그인</LoginButton>
            </LoginForm>
            <RegisterButton>
                <Link to="/register">회원가입</Link>
            </RegisterButton>
            {error && <span className="errorMessage">{error}</span>}
        </LoginContainer>
    )
}

export default Login
