import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Ipost } from '../type';
import { useLocation } from 'react-router';
import Loading from '../components/Loading';


const HomeContainer = styled.div`
    display: flex;
`

function Home() {
    const [posts, setPosts] = useState<Ipost[]>([]);
    const [loading, setLoading] = useState(false);
    const {search} = useLocation();

    useEffect(()=> {
        setLoading(true);
        const fetchPosts = async() => {
            const res = await axios.get("http://localhost:4000/api/post" + search)
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    },[search]);



    return (
        <>
            <Header />
            {loading ? <Loading color="#4285f5" type="spinningBubbles" /> : 
                <HomeContainer>
                    <Posts posts={posts} />
                    <Sidebar />
                </HomeContainer>
            
            }
        </>
    )
}

export default Home;
