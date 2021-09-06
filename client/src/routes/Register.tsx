import React from 'react';
import styled from 'styled-components';
import {sharedButton} from '../sharedStyle';
import {Link} from 'react-router-dom';

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

    const handleRegister = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("register here")
    }
    return (
        <RegisterContainer>
            <RegisterTitle>Register</RegisterTitle>
            <RegisterForm>
                <label>Username</label>
                <input type="text" placeholder="유저명을 입력하세요" required autoComplete="on" />
                <label>Email</label>
                <input type="email" placeholder="이메일을 입력하세요" required autoComplete="on" />
                <label>Password</label>
                <input type="password" placeholder="비밀번호를 입력하세요" required autoComplete="on" />
                <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>
            </RegisterForm>
            <LoginButton>
                <Link to="/login">로그인</Link>
            </LoginButton>
        </RegisterContainer>
    )
}

export default Register
