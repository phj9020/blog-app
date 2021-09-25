import { FunctionComponent } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faPinterestSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';
import { useContextState, useDispatch } from "../context/Context";

const TopBarContainer = styled.header`
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    left:0;
    top:0;
    font-family: 'Josefin Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;
`

const Left = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    .header_icon {
        font-size: 20px;
        margin-right: 10px;
        color: #444;
        cursor: pointer;
    }
`

const Center = styled.div`
    flex:6;
`

const Ul = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    
    li {
        font-size: 18px;
        font-weight: 300;
        cursor: pointer;

        a {
            text-decoration: none;
            color: inherit;
        }
    }

    li:not(:last-child) {
        margin-right: 20px;
    }
`

const Right = styled.div`
    flex:3;
    display: flex;
    align-items: center;
    justify-content: center;

    .search_icon {
        font-size: 18px;
        color: #666;
        cursor: pointer;
        margin-left: 15px;
    }
`

const Img = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
`
const Nav:FunctionComponent<{value: string, path:string}> = ({value, path})=> {
    return (
        <li>
            <Link to={path}>
                {value}
            </Link>
        </li>
    )
};

const TopBar = () => {
    const state = useContextState();
    const dispatch = useDispatch();
    const user = state.user;
    // const PF = "http://localhost:4000/images/"
    const PF = "https://hj-blog-app.herokuapp.com/images/";

    const handleLogOut = (event: React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        dispatch({type:"Log_Out"})
    };

    return (
        <TopBarContainer>
            <Left>
                <a href="https://www.facebook.com/han.j.park.9/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className="header_icon" icon={faFacebookSquare}  />
                </a>
                <FontAwesomeIcon className="header_icon" icon={faTwitterSquare}  />
                <FontAwesomeIcon className="header_icon" icon={faPinterestSquare}  />
                <a href="https://www.instagram.com/hjp9020/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className="header_icon" icon={faInstagramSquare}  />
                </a>
            </Left>
            <Center>
                <Ul>
                    <Nav value="home" path="/" />
                    <Nav value="about" path="/about" />
                    <Nav value="write" path="/write" />
                    {user ? <li onClick={handleLogOut} >logout</li> : null}
                </Ul>
            </Center>
            <Right>
                {user ? (
                    <Link to="/setting">
                        <Img src={user.profilePic ? PF + user.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="profile" />
                    </Link>
                ) : (
                    <Ul>
                        <Nav value="login" path="/login" />
                        <Nav value="register" path="/register" />
                    </Ul>
                )}
                <FontAwesomeIcon className="search_icon" icon={faSearch} />
            </Right>
        </TopBarContainer>
    )
}

export default TopBar;
