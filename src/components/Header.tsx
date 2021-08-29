import styled from 'styled-components';

const HeaderContainer = styled.div`
    margin-top:60px;

    img {
        width: 100%;
        height: 450px;
        margin-top: 80px;
        object-fit: cover;
    }
`

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lora', serif;
    color: #444;


    .header_small{
        position:absolute;
        top: 14%;
        font-size: 20px;
    }
    .header_large{
        position:absolute;
        top: 16%;
        font-size: 100px;
    }
`


function Header() {
    return (
        <HeaderContainer>
            <HeaderTitle>
                <span className="header_small">Han Jin's</span>
                <span className="header_large">Blog</span>
            </HeaderTitle>
            <img src="/img/background.jpg" alt="postercover" />
        </HeaderContainer>
    )
}

export default Header
