import { FunctionComponent } from 'react';
import ReactLoading, { LoadingType } from 'react-loading';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Loading:FunctionComponent<{type:LoadingType, color:string}> = ({ type, color }) => (
    <LoadingContainer>
        <ReactLoading type={type} color={color} height={'7%'} width={'7%'} />
    </LoadingContainer>
);

export default Loading;