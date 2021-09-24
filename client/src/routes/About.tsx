import styled from 'styled-components';

const AboutContainer = styled.div`
    height: calc(100vh - 50px);
    background-color: #e4dfdc;
    text-align: center;

    > img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        margin-bottom: 50px;
        opacity: 0.9;
    }
`

const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > h2 {
        font-size: 24px;
        text-transform: uppercase;
        font-family: 'Lora', serif;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        padding: 5px 0px;
    }
    
    > img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50px;
        margin: 50px 0px;
    }

    > p {
        width: 500px;
        margin: 0px auto;
        font-family: 'Noto Sans KR', sans-serif;;
        line-height:1.5;
    }
`

function About() {
    return (
        <AboutContainer>
            <img src="https://cdn.pixabay.com/photo/2015/05/10/22/32/letter-761653_960_720.jpg" alt="about_banner" />
            <AboutContent>
                <h2>Welcome to my Blog</h2>
                <img src="/img/profile.jpg" alt="hjp_profile" />
                <p>
                    안녕하세요. 박한진의 블로그에 방문하신 것을 환영합니다. 개발을 공부하며 배운 내용을 정리하고 노트에 기록하기 위해 만든 블로그 앱입니다.
                    쉽고 이해할 수 있는 글을 작성할 수 있도록 노력 중입니다. 
                </p>
            </AboutContent>
        </AboutContainer>
    )
}

export default About
