import styled from 'styled-components';
import Post from './Post';

const PostsContainer = styled.div`
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

function Posts() {
    return (
        <PostsContainer>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            
        </PostsContainer>
    )
}

export default Posts
