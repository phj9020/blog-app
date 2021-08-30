import styled from 'styled-components';

const SinglePostContainer = styled.div`
    width: 80%;
    cursor: pointer;
`

const PostImg = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 7px;
`
const PostInfo = styled.div`
    margin-top:5px;
`
const PostCategories = styled.div`
    text-align: center;
    color: #c718d1;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 18px;
    span:not(:last-child) {
        margin-right: 10px;
    }

`

const PostTitle = styled.h2`
    text-align: center;
    margin: 20px 0px;
    font-size:24px;
    font-weight: 600;
    font-family: 'Noto Sans KR', sans-serif;
`

const PostDate = styled.span`
    display: block;
    text-align: center;
    margin: 20px 0px;
    font-size: 14px;
    font-family: 'Lora', serif;
    font-style: italic;
    opacity: 0.6;
    
`

const PostParagraph = styled.p`
    margin: 20px 0px 30px 0px;
    line-height:24px;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: justify;
    color: #444;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

function Post() {

    const text = "끝에 풀밭에 발휘하기 때에, 희망의 눈에 것이다. 힘차게 끓는 청춘의 가슴에 봄바람이다. 위하여 이 싸인 어디 생의 열락의 새 황금시대다. 이 붙잡아 예수는 끓는다. 유소년에게서 같은 가치를 피는 못할 아니더면, 동력은 황금시대를 봄바람이다. 실로 가치를실로 가치를실로 가치를실로 가치를 ";

    return (
        <SinglePostContainer>
            <PostImg src="https://picsum.photos/1200/600?random=4" alt="poster" />
            <PostInfo>
                <PostCategories>
                    <span>리액트</span>
                    <span>넥스트</span>
                </PostCategories>
                <PostTitle>
                    포스트 타이틀
                </PostTitle>
                <PostDate>1 hour ago</PostDate>
            </PostInfo>
            <PostParagraph>{text}</PostParagraph>
        </SinglePostContainer>
    )
}

export default Post
