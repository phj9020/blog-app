import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faPinterestSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icategory } from '../type';
import { Link } from 'react-router-dom';


const SidebarContainer = styled.aside`
    flex: 3;
    margin: 20px;
    padding-bottom: 30px;
    background-color: #fdfdfd;
    max-height: 673px;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    position: sticky;
    left: 0;
    top:5%;
    
`

const SidebarItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .sidebar_title {
        width: 80%;
        padding: 5px;
        margin: 10px;
        font-size: 12px;
        line-height:20px;
        color: #222;
        font-weight: 600;
        text-align: center;
        border-top: 1px solid #a7a5a5;
        border-bottom: 1px solid #a7a5a5;
        font-family: 'Varela Round', sans-serif;
    }
    p {
        width: 80%;
        font-family: 'Noto Sans KR', sans-serif;
        padding: 30px 0px;
        line-height:1.5;
        text-align: center;
    }
    
    ul {
        width: 80%;
        padding: 5px 0px;
        
        li {
            display: inline-block;
            width: 50%;
            text-align: center;
            cursor: pointer;
            font-family: 'Noto Sans KR', sans-serif;
            margin:10px 0px;
            a {
                text-decoration: none;
                color: inherit;
            }
        }
    }
`
const Img = styled.img`
    width: 80%;
    margin: 10px 0px;
`

const IconContainer = styled.div`
    a {
        color: inherit;
    }
    a:not(:last-child) {
        margin-right: 10px;
    }
    .sidebar_icon {
        cursor: pointer;
    }
    .sidebar_icon:not(:last-child) {
        margin-right: 10px;
    }
`

function Sidebar() {
    const [categories, setCategories] = useState<Icategory[]>([]);

    useEffect(()=> {
        const getCategories = async ()=> {
            const res = await axios.get("http://localhost:4000/api/categories");
            setCategories(res.data)
        };
        getCategories();
    },[])


    return (
        <SidebarContainer>
            <SidebarItem>
                <span className="sidebar_title">About Me</span>
                <Img src="https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_960_720.jpg" alt="profile" />
                <p>박한진의 개발 블로그에 오신 것을 환영합니다.</p>
            </SidebarItem>
            <SidebarItem>
                <span className="sidebar_title">Categories</span>
                <ul>
                    {categories.map(category => 
                        <li key={category._id}>
                            <Link to={`/?category=${category.name}`}>
                                {category.name}
                            </Link>
                        </li>    
                    )}
                </ul>
            </SidebarItem>
            <SidebarItem>
                <span className="sidebar_title">Follow me</span>
                <IconContainer>
                    <a href="https://www.facebook.com/han.j.park.9/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className="sidebar_icon" icon={faFacebookSquare}  />
                    </a>
                    <FontAwesomeIcon className="sidebar_icon" icon={faTwitterSquare}  />
                    <FontAwesomeIcon className="sidebar_icon" icon={faPinterestSquare}  />
                    <a href="https://www.instagram.com/hjp9020/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className="sidebar_icon" icon={faInstagramSquare}  />
                    </a>
                </IconContainer>
            </SidebarItem>
        </SidebarContainer>
    )
}

export default Sidebar
