import React, { useState } from 'react';
import styled from 'styled-components';
import {sharedButton} from '../sharedStyle';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const RegisterContainer = styled.div`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:linear-gradient(
        rgba(255, 255, 255,0.6), 
        rgba(255, 255, 255,0.6)
    ),
    url("https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_1280.jpg") no-repeat center center;
    background-size: cover;
    position:relative;
`

const RegisterTitle = styled.span`
    font-size: 26px;
`

const RegisterForm = styled.form`
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
    span {
        font-size: 12px;
        color: red;
        margin-bottom: 10px;
    }
`

const RegisterButton =styled.button`
    margin-top: 15px;
    ${sharedButton}
    background-color: #002366;
    `

const LoginButton = styled.button`
    width: 80px;
    position:absolute;
    right: 15px;
    top: 10px;
    ${sharedButton}
    background-color: teal;
    a {
        text-decoration: none;
        color:inherit;
    }
`


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useHistory();
    
    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const postRegister = await axios({
                url: "http://localhost:4000/api/auth/register",
                method: "POST",
                data: {
                    username,
                    email,
                    password
                }
            });

            if(postRegister?.status === 201) {
                alert("계정을 성공적으로 생성했습니다");
                history.push({
                    pathname: "/login",
                    state: {
                        email,
                        password
                    }
                });
            } 
        } catch (error:any) {
            setError(error.response.data.error)
        }
    };

    const handleOnChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
        setError("");
        if(event.target.type === "text") {
            setUsername(event.target.value);
        } else if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <RegisterContainer>
            <RegisterTitle>Register</RegisterTitle>
            <RegisterForm onSubmit={handleRegister}>
                <label>Username</label>
                {error && <span>{error}</span>}
                <input type="text" placeholder="유저명을 입력하세요" required autoComplete="on" value={username} onChange={handleOnChange} />
                <label>Email</label>
                {error && <span>{error}</span>}
                <input type="email" placeholder="이메일을 입력하세요" required autoComplete="on" value={email} onChange={handleOnChange} />
                <label>Password</label>
                <input type="password" placeholder="비밀번호를 입력하세요" required autoComplete="on" value={password} onChange={handleOnChange} />
                <RegisterButton type="submit">회원가입</RegisterButton>
            </RegisterForm>
            <LoginButton>
                <Link to="/login">로그인</Link>
            </LoginButton>
        </RegisterContainer>
    )
}

export default Register
