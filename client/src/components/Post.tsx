import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Ipost } from '../type';

const SinglePostContainer = styled.div`
    width: 80%;

    a {
        color: inherit;
        text-decoration: none;
        :focus {
            color: inherit;
        }
    }
`

const PostImg = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 7px;
`
const PostInfo = styled.div`
    margin-top:5px;
`
const PostCategories = styled.div`
    text-align: center;
    color: #c718d1;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 18px;
    span:not(:last-child) {
        margin-right: 10px;
    }

`

const PostTitle = styled.h2`
    text-align: center;
    margin: 20px 0px;
    font-size:24px;
    font-weight: 600;
    font-family: 'Noto Sans KR', sans-serif;
`

const PostDate = styled.span`
    display: block;
    text-align: center;
    margin: 20px 0px;
    font-size: 14px;
    font-family: 'Lora', serif;
    font-style: italic;
    opacity: 0.6;
    
`

const PostParagraph = styled.p`
    margin: 20px 0px 30px 0px;
    line-height:24px;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
    color: #444;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`


const Post:FunctionComponent<{post:Ipost}> = ({post}) => {
    // local environment
    // const PF = "http://localhost:4000/images/";

    const {_id, title, description,createdAt, categories, photo} = post;

    return (
        <SinglePostContainer>
            {photo ? 
                <PostImg src={photo} alt={title} /> : <PostImg src="/img/base.jpg" alt="default" />
            }
            <Link to={`/post/${_id}`}>
                <PostInfo>
                    <PostCategories>
                        {categories.map((cat,index) => <span key={index}>{cat}</span>)}
                    </PostCategories>
                    <PostTitle>
                        {title}
                    </PostTitle>
                    <PostDate>{new Date(createdAt).toDateString()}</PostDate>
                </PostInfo>
                <PostParagraph>{description}</PostParagraph>
            </Link>
        </SinglePostContainer>
    )
}

export default Post
