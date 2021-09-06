import styled from 'styled-components';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

const HomeContainer = styled.div`
    display: flex;
`

function Home() {
    return (
        <>
            <Header />
            <HomeContainer>
                <Posts />
                <Sidebar />
            </HomeContainer>
        </>
    )
}

export default Home;
