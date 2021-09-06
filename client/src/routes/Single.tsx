import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

const SingleContainer = styled.div`
    display: flex;
`

function Single() {
    return (
        <SingleContainer>
            <SinglePost />
            <Sidebar />
        </SingleContainer>
    )
}

export default Single
