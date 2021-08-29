// import { FunctionComponent } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faPinterestSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

const TopBarContainer = styled.div`
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
    object-fit: cover;
    border-radius: 50%;
`

const TopBar = () => {
    return (
        <TopBarContainer>
            <Left>
                <FontAwesomeIcon className="header_icon" icon={faFacebookSquare}  />
                <FontAwesomeIcon className="header_icon" icon={faTwitterSquare}  />
                <FontAwesomeIcon className="header_icon" icon={faPinterestSquare}  />
                <FontAwesomeIcon className="header_icon" icon={faInstagramSquare}  />
            </Left>
            <Center>
                <Ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Write</li>
                    <li>Logout</li>
                </Ul>
            </Center>
            <Right>
                <Img src="/img/profile.jpg" alt="profile" />
                <FontAwesomeIcon className="search_icon" icon={faSearch} />
            </Right>
        </TopBarContainer>
    )
}

export default TopBar;
