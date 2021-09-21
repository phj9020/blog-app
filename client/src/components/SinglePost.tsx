import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Ipost } from '../type';
import { Link } from 'react-router-dom';
import { useContextState } from '../context/Context';


const SinglePostContainer = styled.main`
    flex: 9;
`

const SinglePostWrapper = styled.div`
    padding: 20px;
    padding-right: 0px;
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

function SinglePost() {
    const PF = "http://localhost:4000/images/";
    const [singlePost, setSinglePost] = useState<Ipost>();
    let location = useLocation();
    let history = useHistory();
    const {pathname} = location;
    const state = useContextState();
    
    const handleDeletePost = async(e: React.MouseEvent<SVGSVGElement>)=>{
        e.preventDefault();
        const config  = {
            data: {
                id: state?.user?._id
            }
        };

        try{
            const res = await axios.delete(`http://localhost:4000/api${pathname}`, config)
            console.log(res)
            if(res.status === 200) {
                alert(res.data);
                history.push("/");
            }
        } catch(err : any){
            console.log(err)
        }
        
    }

    useEffect(() => {
        const getSinglePost = async()=> {
            const res = await axios.get(`http://localhost:4000/api${pathname}`);
            setSinglePost(res.data);
        }
        getSinglePost();
    },[pathname]);
    
    
    return (
        <SinglePostContainer>
            <SinglePostWrapper>
                {singlePost?.photo ? 
                    <SinglePostImg src={PF + singlePost?.photo} alt="poster" /> : <SinglePostImg src="/img/base.jpg" alt="default" />
                }
                <SinglePostTitle>
                    {singlePost?.title}
                    {singlePost?.username === state?.user?.username && 
                        <SinglePostEdit>
                            <FontAwesomeIcon className="singlePostIcon" icon={faEdit} />
                            <FontAwesomeIcon className="singlePostIcon" icon={faTrashAlt} onClick={handleDeletePost}/>
                        </SinglePostEdit>
                    }
                </SinglePostTitle>
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
                <SinglePostDescription> 
                    {singlePost?.description}
                </SinglePostDescription>
            </SinglePostWrapper>
        </SinglePostContainer>
    )
}

export default SinglePost
