import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import {sharedButton} from '../sharedStyle';
import {Link, useLocation} from 'react-router-dom';
import { IRegisterStateType } from '../type';

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
    let {state} = useLocation<IRegisterStateType>();
    
    // console.log(state)

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // To do: post login
    };

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.type ==="email") {
            setEmail(event.target.value);
        } else if(event.target.type === "password") {
            setPassword(event.target.value);
        }
    };
    // console.log(email, password)
    return (
        <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" placeholder="이메일을 입력하세요" required autoComplete="off" onChange={handleOnChange} value={state ? state.email : email} />
                <label>Password</label>
                <input type="password" placeholder="비밀번호를 입력하세요" required autoComplete="off" onChange={handleOnChange} value={state ? state.password : password} />
                <LoginButton>로그인</LoginButton>
            </LoginForm>
            <RegisterButton>
                <Link to="/register">회원가입</Link>
            </RegisterButton>
        </LoginContainer>
    )
}

export default Login
