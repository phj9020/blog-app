import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const SinglePostContainer = styled.main`
    flex: 9;
`

const SinglePostWrapper = styled.div`
    padding: 20px;
    padding-right: 0px;
`

const SinglePostImg = styled.img`
    width: 100%;
    height:300px;
    object-fit: cover;
    border-radius: 5px;
`

const SinglePostTitle = styled.h1`
    margin-top:20px;
    text-align: center;
    font-size:28px;
    font-weight: 600;
    font-family: 'Noto Sans KR', sans-serif;
`

const SinglePostEdit = styled.div`
    float: right;
    font-size: 20px;

    .singlePostIcon {
        cursor: pointer;
    }
    .singlePostIcon:not(:last-child) {
        margin-right: 15px;
    }
    .fa-edit{
        color: teal;
    }
    .fa-trash-alt {
        color: tomato;
    }

`

const SinglePostInfo = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-family: 'Noto Sans KR', sans-serif;

    .singlePostProfile {
        display: flex;
        align-items: center;
    }
`
const ProfileImg = styled.img`
    width: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
`

const SinglePostAuthor = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    `
const SinglePostDate = styled.span`
    font-size: 14px;
    opacity:0.7;
`

const PostCategories = styled.div`
    font-size: 20px;
    font-family: 'Nanum Pen Script', cursive;
    span {
        margin-left: 10px;
    }
`

const SinglePostDescription = styled.p`
    font-family: 'Noto Sans KR', sans-serif;
    font-size:18px;
    line-height:27px;
    color: #666;

    ::first-letter {
        margin-left: 20px;
        font-size: 30px;
        font-weight: 600;
    }
`

function SinglePost() {
    return (
        <SinglePostContainer>
            <SinglePostWrapper>
                <SinglePostImg src="https://picsum.photos/1200/600?random=4" alt="poster" />
                <SinglePostTitle>
                    리액트로 프로젝트를 만들며 접한 오류 정리
                    <SinglePostEdit>
                        <FontAwesomeIcon className="singlePostIcon" icon={faEdit}/>
                        <FontAwesomeIcon className="singlePostIcon" icon={faTrashAlt}/>
                    </SinglePostEdit>
                </SinglePostTitle>
                <SinglePostInfo>
                    <div className="singlePostProfile">
                        <ProfileImg src="/img/profile.jpg" alt="profile" />
                        <SinglePostAuthor>박한진</SinglePostAuthor>
                        <SinglePostDate>1 hr ago</SinglePostDate>
                    </div>
                    <PostCategories>
                        <span>리액트</span>
                        <span>넥스트</span>
                    </PostCategories>
                </SinglePostInfo>
                <SinglePostDescription>
                    끝에 풀밭에 발휘하기 때에, 희망의 눈에 것이다. 힘차게 끓는 청춘의 가슴에 봄바람이다. 위하여 이 싸인 어디 생의 열락의 새 황금시대다. 이 붙잡아 예수는 끓는다. 유소년에게서 같은 가치를 피는 못할 아니더면, 동력은 황금시대를 봄바람이다. 실로 가치를실로 가치를실로 가치를실로 가치를
                    끝에 풀밭에 발휘하기 때에, 희망의 눈에 것이다. 힘차게 끓는 청춘의 가슴에 봄바람이다. 위하여 이 싸인 어디 생의 열락의 새 황금시대다. 이 붙잡아 예수는 끓는다. 유소년에게서 같은 가치를 피는 못할 아니더면, 동력은 황금시대를 봄바람이다. 실로 가치를실로 가치를실로 가치를실로 가치를
                    끝에 풀밭에 발휘하기 때에, 희망의 눈에 것이다. 힘차게 끓는 청춘의 가슴에 봄바람이다. 위하여 이 싸인 어디 생의 열락의 새 황금시대다. 이 붙잡아 예수는 끓는다. 유소년에게서 같은 가치를 피는 못할 아니더면, 동력은 황금시대를 봄바람이다. 실로 가치를실로 가치를실로 가치를실로 가치를
                    끝에 풀밭에 발휘하기 때에, 희망의 눈에 것이다. 힘차게 끓는 청춘의 가슴에 봄바람이다. 위하여 이 싸인 어디 생의 열락의 새 황금시대다. 이 붙잡아 예수는 끓는다. 유소년에게서 같은 가치를 피는 못할 아니더면, 동력은 황금시대를 봄바람이다. 실로 가치를실로 가치를실로 가치를실로 가치를
                </SinglePostDescription>
            </SinglePostWrapper>
        </SinglePostContainer>
    )
}

export default SinglePost
