import styled from "styled-components";
import ReactImageGrid from "@cordelia273/react-image-grid";

export const PostItemRight = styled.div`
  position: relative;
  flex-grow: 1;
  width: calc(100% - 64px - 20px);
`;
export const PostItemRightContent = styled.div`
  padding: 5px 15px;
  border-radius: 12px;
  background-color: #f5f5f7;
`;

export const PostItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const PostItemBody = styled.div`
  padding: 4px 2px;
  display: flex;
  flex-direction: column;
`;

export const PostItemText = styled.div`
  color: inherit;
  padding: 5px 0;
  white-space: pre-line;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
`;

export const PostUserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .4px;
    margin-right: 5px;
    color: #000;
  }
`;

export const PostUserVote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    width: 32px;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    background: #e03;
    border-radius: 50%;
  }
`;

export const ReactImageGridCustom = styled(ReactImageGrid)`
  grid-template-columns: 2fr 2fr 2fr 2fr !important;
  grid-template-rows: repeat(1, 1fr) !important;
  & .sc-gsDJrp:nth-child(1) {
    height: 250px;
    width: 250px;
    grid-row: 1 / span 2 !important;
  }
  & .sc-gsDJrp:nth-child(2) {
    height: 250px;
    width: 250px;
    grid-row: 1 / span 2;
  }
  
`;