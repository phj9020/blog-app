import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const WriteContainer = styled.div`
    padding-top: 50px;
    
    .writeImageContainer {
        display: flex;
        justify-content: center;
        
        img {
            width: 65vw;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    `

const WriteForm = styled.form`
    position: relative;
    padding-bottom: 50px;
    
    .writeFormGroup {
        margin: 0px auto;
        display: flex;
        align-items: center;
        width: 65vw;
        
        .fileupload {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            padding: 3px;
            border: 1px solid;
            cursor: pointer;
        }
        .text_input {
            font-family: 'Noto Sans KR', sans-serif;
            width: 100%;
            font-size: 30px;
            padding: 20px;
            border: none;

            :focus {
                outline:none;
        } 
    }
        
    textarea{
        resize: none;
        font-size: 20px !important;
        min-height: 50vh;
        border: 1px solid gray;
    }

}
`

const SubmitBtn = styled.button`
    display: block;
    width:10%;
    min-width: 100px;
    margin: 50px auto;
    margin-bottom: 0px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: white;
    background-color: #2C5F2D;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    :hover {
        background-color: #97BC62FF;
    }
`

function Write() {
    return (
        <WriteContainer>
            <div className="writeImageContainer">
                <img src="https://picsum.photos/1200/600?random=4" alt="uploadedImage" />
            </div>
            <WriteForm>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput" title="Post Cover Image">
                        <FontAwesomeIcon className="fileupload" icon={faPlus} />
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} />
                    <input type="text" className="text_input" placeholder="타이틀" autoFocus={true} required/>
                </div>
                <div className="writeFormGroup">
                    <textarea className="text_input" placeholder="블로그 내용을 작성하세요.." required ></textarea>
                </div>
                <SubmitBtn>완료</SubmitBtn>
            </WriteForm>
        </WriteContainer>
    )
}

export default Write
