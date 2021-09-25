import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Ipost } from '../type';
import { Link } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { sharedButton } from '../sharedStyle';
import Loading from './Loading';


const SinglePostContainer = styled.main`
    flex: 9;
`

const SinglePostWrapper = styled.div`
    padding: 20px;
    padding-right: 0px;

    // when update mode on input, textarea style
    .singlePostTitleInput, .singlePostDescriptionInput {
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
`

const SinglePostImg = styled.img`
    width: 100%;
    height:300px;
    object-fit: cover;
    border-radius: 5px;
`

const SinglePostTitle = styled.h1`
    margin-top:20px;
    text-align: center;
    font-size:28px;
    font-weight: 600;
    font-family: 'Noto Sans KR', sans-serif;
`

const SinglePostEdit = styled.div`
    float: right;
    font-size: 20px;

    .singlePostIcon {
        cursor: pointer;
    }
    .singlePostIcon:not(:last-child) {
        margin-right: 15px;
    }
    .fa-edit{
        color: teal;
    }
    .fa-trash-alt {
        color: tomato;
    }

`

const SinglePostInfo = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-family: 'Noto Sans KR', sans-serif;

    .singlePostProfile {
        display: flex;
        align-items: center;
    }
`
const ProfileImg = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
`

const SinglePostAuthor = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    a {
        color: inherit;
        text-decoration: none;
    }
`
const SinglePostDate = styled.span`
    font-size: 14px;
    opacity:0.7;
`

const PostCategories = styled.div`
    font-size: 20px;
    font-family: 'Nanum Pen Script', cursive;
    span {
        margin-left: 10px;
    }
`

const SinglePostDescription = styled.p`
    font-family: 'Noto Sans KR', sans-serif;
    font-size:18px;
    line-height:1.5;
    color: #666;
    white-space:pre-wrap;

    ::first-letter {
        margin-left: 20px;
        font-size: 30px;
        font-weight: 600;
    }
`
const ButtonContainer = styled.div`
    text-align: center;
`

const CancelButton = styled.button`
    min-width: 100px;
    background-color: red;
    margin-right: 50px;
    ${sharedButton}
    `

const UpdateButton = styled.button`
    min-width: 100px;
    background-color: green;
    ${sharedButton}
`

function SinglePost() {
    // const PF = "http://localhost:4000/images/";
    
    const [singlePost, setSinglePost] = useState<Ipost>();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    let location = useLocation();
    let history = useHistory();
    const {pathname} = location;
    const state = useContextState();
    
    // updateMode 
    const handleUpdateMode = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        setUpdateMode(true);
    };

    // updatePost
    const handleUpdatePost = async(e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        try{
            const res = await axios.put(`https://hj-blog-app.herokuapp.com/api/post/${singlePost?._id}`, {
                    username: state.user.username,
                    title,
                    description
                
            });
            if(res.status === 200) {
                alert("글이 성공적으로 수정되었습니다");
                window.location.reload();
            };
        } catch (err: any){
            alert(err.response.data);
        }
    }

    // DeletePost
    const handleDeletePost = async(e: React.MouseEvent<SVGSVGElement>)=>{
        e.preventDefault();
        const ask = window.confirm("정말 포스트를 삭제하시겠습니까?");
        
        if(ask === false) {
            return;
        };
        
        const config  = {
            data: {
                id: state?.user?._id
            }
        };

        try{
            const res = await axios.delete(`https://hj-blog-app.herokuapp.com/api/post/${singlePost?._id}`, config);
            if(res.status === 200) {
                alert(res.data);
                history.push("/");
            }
        } catch(err : any){
            console.log(err)
        }
        
    }

    useEffect(() => {
        setLoading(true);
        const getSinglePost = async()=> {
            const res = await axios.get(`https://hj-blog-app.herokuapp.com/api${pathname}`);
            setSinglePost(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setLoading(false);
        }
        getSinglePost();
    },[pathname]);

    
    
    return (
        <SinglePostContainer>
            {loading ? <Loading color="#4285f5" type="spinningBubbles" /> : 
                (
                    <SinglePostWrapper>
                        {singlePost?.photo ? 
                            <SinglePostImg src={ singlePost?.photo } alt={singlePost?.title} /> :
                            <SinglePostImg src={"/img/base.jpg"} alt="default" /> 
                        }
                        {updateMode ? <input type="text" className="singlePostTitleInput" required={true} value={title} onChange={(e)=> setTitle(e.target.value)} /> :
                            (
                                <SinglePostTitle>
                                    {singlePost?.title}
                                    {singlePost?.username === state?.user?.username && 
                                        <SinglePostEdit>
                                            <FontAwesomeIcon className="singlePostIcon" icon={faEdit} onClick={handleUpdateMode}/>
                                            <FontAwesomeIcon className="singlePostIcon" icon={faTrashAlt} onClick={handleDeletePost}/>
                                        </SinglePostEdit>
                                    }
                                </SinglePostTitle>
                            )
                        }
                        <SinglePostInfo>
                            <div className="singlePostProfile">
                                <ProfileImg src={singlePost?.owner?.profilePic !== "" ? singlePost?.owner?.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" } alt="profile" />
                                <SinglePostAuthor><Link to={`/?user=${singlePost?.username}`}>{singlePost?.username}</Link></SinglePostAuthor>
                                <SinglePostDate>{singlePost?.createdAt.substring(0,10)}</SinglePostDate>
                            </div>
                            <PostCategories>
                                {singlePost?.categories.map((category,index) => <span key={index}>{category}</span>)}
                            </PostCategories>
                        </SinglePostInfo>
                        {updateMode ? <textarea  placeholder="블로그 내용을 작성하세요.." className="singlePostDescriptionInput" required={true} value={description} onChange={(e)=> setDescription(e.target.value)}></textarea> : (
                            <SinglePostDescription> 
                                {singlePost?.description}
                            </SinglePostDescription>   
                        )}
                        {updateMode && 
                            <ButtonContainer>
                                <CancelButton onClick={() => setUpdateMode(false)}>취소</CancelButton>
                                <UpdateButton onClick={handleUpdatePost}>업데이트</UpdateButton>
                            </ButtonContainer>
                        }
                    </SinglePostWrapper>
                    
                )
            }
        </SinglePostContainer>
    )
}

export default SinglePost
