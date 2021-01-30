import styled, { css } from "styled-components";

export const StyledTable = styled.table`
  width: 100%; 
  border: 1px solid;
  border-color: #d8dbe0;
  margin: 6px 0;
  border-collapse: collapse;

  & tbody tr:nth-child(odd) {
    background-color: #ececec;
  }
  ${(props) =>
    props.normal &&
    css`
        background-color: #fff;
        border: none;
        & td {
          padding: 10px;
          border-bottom: 1px solid #cecece
        }
        & tbody tr:nth-child(odd) {
          background-color: #fff;
        }
      `}
`;

export const StyledTr = styled.tr`
  /* border-bottom: 1px solid rgba(113, 110, 182, 0.15); */
  /* background-color: ${props => props.odd === 1 ? 'rgba(0,0,21,.05)' : '#fff'}; */
  
`;

export const StyledTh = styled.th`
  cursor: pointer;
  padding-right: 30px;
  vertical-align: bottom;
  border: 1px solid;
  border-color: #d8dbe0;
  padding: .75rem;
  text-align: left;
`;

export const StyledTd = styled.td`
  padding: 8px 10px;
  word-wrap: break-word;
  border: 1px solid;
  border-color: #d8dbe0;
  padding: 1rem;
  vertical-align: top;
`;

export const StyledPage = styled.li`
    background-color: white;
    font-size: 1.3rem;
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
    text-align: center;
    list-style: none;
    z-index: 2;
    color: #000000;
    border: 1px solid #c4c9d0;

  &.active {
    background-color: ${props => props.theme.grey}
  }
`;
