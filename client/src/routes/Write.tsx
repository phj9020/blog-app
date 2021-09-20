import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useContextState } from '../context/Context';
import { newPost } from '../type';
import { useHistory } from 'react-router';

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
        .text_input, .small {
            font-family: 'Noto Sans KR', sans-serif;
            width: 100%;
            font-size: 30px;
            padding: 20px;
            border: none;
            :focus {
                outline:none;
        } 

    }
    .small {
        font-size: 14px;
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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const state = useContextState();
    const {_id, username} = state.user;
    let history = useHistory();

    const handleWriteSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPost : newPost  = {
            owner: {
                _id
            },
            categories: [...category],
            username,
            title,
            description
        };
        // if file exist make formData and add name, file put it in newPost object
        if(file) {
            const data =  new FormData();
            const filename : string = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            // post upload photo api
            try {
                const res = await axios.post("http://localhost:4000/api/upload", data);
                console.log(res)
            } catch (error:any) {   
                console.log(error);
            }
        };

        try {
            const res = await axios.post("http://localhost:4000/api/post/createPost", newPost);
            console.log(res)
            history.push("/post/" + res.data._id);
        } catch (error:any) {
            console.log(error);
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target)
        if(e.target.id === "title") {
            setTitle(e.target.value)
        } else if(e.target.id === "category") {
            console.log(e.target.value)
            const categories = e.target.value.split(",");
            setCategory(categories);
        } else {
            setDescription(e.target.value)
        }
    };

    return (
        <WriteContainer>
            <div className="writeImageContainer">
                {file && 
                    <img src={URL.createObjectURL(file)} alt="uploadedImage" />
                }
            </div>
            <WriteForm onSubmit={handleWriteSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput" title="Post Cover Image">
                        <FontAwesomeIcon className="fileupload" icon={faPlus} />
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=> {
                        if(!e.target.files) return;
                        setFile(e.target.files[0]);
                    }} />
                    <input type="text" id="title" className="text_input" placeholder="타이틀" autoFocus={true} required={true} value={title} onChange={handleOnChange}/>
                </div>
                <div className="writeFormGroup">
                    <input type="text" id="category" className="small" placeholder="카테고리(ex. 노드,리액트)"  required={true}  onChange={handleOnChange} />
                </div>
                <div className="writeFormGroup">
                    <textarea className="text_input" placeholder="블로그 내용을 작성하세요.." required={true} value={description} onChange={handleOnChange}></textarea>
                </div>
                <SubmitBtn type="submit">완료</SubmitBtn>
            </WriteForm>
        </WriteContainer>
    )
}

export default Write
