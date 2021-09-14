import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Ipost } from '../type';
import Post from './Post';

const PostsContainer = styled.main`
    flex: 9;
    margin-top: 20px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    place-items: center;

    @media (max-width: 930px) {
        grid-template-columns: repeat(1,1fr);
    }
`



const Posts:FunctionComponent<{posts: Ipost[]}> = ({posts}) => {

    return (
        <PostsContainer>
            {posts.map((post,index) => <Post key={index} post={post} />)}
        </PostsContainer>
    )
}

export default Posts
