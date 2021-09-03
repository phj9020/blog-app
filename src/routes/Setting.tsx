import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

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
            width: 100px;
            height: 100px;
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
    cursor: pointer;
    border:none;
    border-radius: 7px;
    background-color: teal;
    padding: 10px;
    color: white;
    margin-top:60px;
    font-family: 'Noto Sans KR', sans-serif;
`



function Setting() {
    return (
        <SettingContainer>
            <SettingWrapper>
                <SettingTitle>
                    <span className="setting_UpdateTitle">계정 업데이트</span>
                    <span className="setting_DeleteTitle">계정 삭제</span>
                </SettingTitle>
                <SettingForm>
                    <label>Profile Picture</label>
                    <div className="setting_ProfilePic">
                        <img src="/img/profile.jpg" alt="profilepic" />
                        <label htmlFor="profileUpload" title="프로필 이미지 업로드">
                            <FontAwesomeIcon className="setting_ProfileIcon" icon={faUserCircle} />
                        </label>
                        <input type="file" id="profileUpload" style={{display: "none"}}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="유저이름을 입력하세요" />
                    <label>Email</label>
                    <input type="email" placeholder="이메일을 입력하세요" />
                    <label>Password</label>
                    <input type="password" placeholder="비밀번호를 입력하세요" />
                    <SettingSubmit>저장하기</SettingSubmit>
                </SettingForm>
            </SettingWrapper>
            <Sidebar />
        </SettingContainer>
    )
}

export default Setting
