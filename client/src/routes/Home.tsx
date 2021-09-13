import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';


const HomeContainer = styled.div`
    display: flex;
`

function Home() {
    const [posts, setPosts] = useState<[]>([]);

    useEffect(()=> {
        const fetchPosts = async() => {
            const res = await axios.get("http://localhost:4000/api/post")
            setPosts(res.data)
        }
        fetchPosts();
    },[]);
    return (
        <>
            <Header />
            <HomeContainer>
                <Posts posts={posts} />
                <Sidebar />
            </HomeContainer>
        </>
    )
}

export default Home;
