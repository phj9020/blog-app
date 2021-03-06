import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { sharedButton } from '../sharedStyle';
import { useContextState, useDispatch } from '../context/Context';
import { useEffect, useState } from 'react';
import { IupdateUser } from '../type';
import axios from 'axios';

const SettingContainer = styled.div`
    display: flex;
`

const SettingWrapper = styled.main`
    flex: 9;
    padding: 30px;
`

const SettingTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: lightcoral;
    font-family: 'Noto Sans KR', sans-serif;

    .setting_UpdateTitle {
        font-size: 30px;
    }
    .setting_DeleteTitle {
        color: red;
        font-size: 12px;
        cursor: pointer;
    }
`
    
const SettingForm = styled.form`
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;

    .setting_ProfilePic {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        img {
            width: 150px;
            height: 150px;
            border-radius: 20px;
            object-fit: cover;
            margin: 20px 0px;
        }

        .setting_ProfileIcon {
            width:25px;
            height:25px;
            border-radius: 50%;
            color: teal;
            cursor: pointer;
        }
    }

    > label {
        font-family: 'Lora', serif;
        font-size:20px;
        margin-top: 20px;
    }

    > input {
        color:gray;
        margin: 10px 0px;
        height:  30px;
        border:none;
        border-bottom: 1px solid lightgray;

        :focus{
            outline:none;
        }
    }
`

const SettingSubmit = styled.button`
    width: 20%;
    align-self: center;
    background-color: teal;
    ${sharedButton}
    margin-top: 60px;
`



function Setting() {
    const state = useContextState();
    const user = state.user;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch();
    // local environment
    // const PF = "http://localhost:4000/images/";
    
    const handleSettingSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "Update_User_Start"});
        const updateUser : IupdateUser  = {
            userId: user?._id,
            username,
            email,
            password
        };
    
        if(file) {
            const data =  new FormData();
            const filename : string = Date.now() + "-" + file.name;
            data.append("name", filename);
            data.append("file", file);
            // local environment
            // updateUser.profilePic = filename;
            
            // post upload photo api
            try {
                const res = await axios.post("https://hj-blog-app.herokuapp.com/api/upload", data);
                if(res.status === 200) {
                    updateUser.profilePic = res.data;
                }
                
            } catch (error:any) {   
                console.log(error);
            }
        };

        try {
            const res = await axios.put(`https://hj-blog-app.herokuapp.com/api/users/${user?._id}`, updateUser);
            if(res.status === 200) {
                dispatch({type:"Update_User_Success", payload: res.data})
                alert("????????? ????????? ??????????????? ???????????? ???????????????. ?????? ???????????? ?????????.")
                dispatch({type:"Log_Out"});
            };
        } catch (error:any) {
            dispatch({type:"Update_User_Failure"});
            alert(error.response.data);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === "text") {
            setUsername(e.target.value);
        } else if(e.target.type === "email") {
            setEmail(e.target.value);
        } else if(e.target.type === "password") {
            setPassword(e.target.value);
        }
        
    }

    const handleDeleteAccount = async(e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const ask = window.confirm("?????? ????????? ?????????????????????????");
        
        if(ask === false) {
            return;
        };

        const config  = {
            data: {
                userId: state?.user?._id
            }
        };
        try {
            const res = await axios.delete(`https://hj-blog-app.herokuapp.com/api/users/${user?._id}`, config);
            alert(res.data.message);
            dispatch({type:"Log_Out"});
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    useEffect(()=> {
        setUsername(user?.username);
        setEmail(user?.email);
    },[user])
    
    return (
        <SettingContainer>
            <SettingWrapper>
                <SettingTitle>
                    <span className="setting_UpdateTitle">?????? ????????????</span>
                    <span className="setting_DeleteTitle" onClick={handleDeleteAccount}>?????? ??????</span>
                </SettingTitle>
                <SettingForm onSubmit={handleSettingSubmit} encType="multipart/form-data">
                    <label>Profile Picture</label>
                    <div className="setting_ProfilePic">
                        {file ?
                            <img src={URL.createObjectURL(file)} alt="uploadedProfile" /> :
                            <img src={user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="profilepic" />
                        }
                        <label htmlFor="profileUpload" title="????????? ????????? ?????????">
                            <FontAwesomeIcon className="setting_ProfileIcon" icon={faUserCircle} />
                        </label>
                        <input type="file" id="profileUpload" style={{display: "none"}} onChange={(e)=> {
                            if(!e.target.files) return;
                            setFile(e.target.files[0]);
                        }} accept="image/*" />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="????????? ??????????????? ???????????????" autoComplete="off" required={true} value={username} onChange={handleChange}/>
                    <label>Email</label>
                    <input type="email" placeholder="????????? ???????????? ???????????????" autoComplete="off" required={true} value={email} onChange={handleChange} />
                    <label>Password</label>
                    <input type="password" placeholder="????????? ??????????????? ???????????????" autoComplete="off" required={true} value={password} onChange={handleChange} />
                    <SettingSubmit type="submit">????????????</SettingSubmit>
                </SettingForm>
            </SettingWrapper>
            <Sidebar />
        </SettingContainer>
    )
}

export default Setting
