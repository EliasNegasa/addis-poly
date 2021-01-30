import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
    transition: margin .3s;
    display: -ms-flexbox;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    min-height: 100vh;
`;

export const StyledContent = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  padding: 2rem;
`;

export const StyledSideBar = styled.div`
    /* position: fixed; */
    top: 0;
    bottom: 0;
    z-index: 1030;
    display: -ms-flexbox;
    display: flex;
    flex: 0 0 256px;
    flex-direction: column;
    order: -1;
    width: 240px;
    padding: 0;
    box-shadow: none;
    color: #fff;
    background: ${(props) => props.theme.secondary};;
    transition: box-shadow .3s .15s,margin-left .3s,margin-right .3s,width .3s,z-index 0s ease .3s,-webkit-transform .3s;
    transition: box-shadow .3s .15s,transform .3s,margin-left .3s,margin-right .3s,width .3s,z-index 0s ease .3s;
    transition: box-shadow .3s .15s,transform .3s,margin-left .3s,margin-right .3s,width .3s,z-index 0s ease .3s,-webkit-transform .3s;
`;

export const StyledHeader = styled.div`
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    position: sticky;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
    min-height: 56px;
    background: #fff;
    border-bottom: 1px solid #d8dbe0;
    border: 0;
    /* box-shadow: 0 2px 2px 0 rgba(60,75,100,.14), 0 3px 1px -2px rgba(60,75,100,.12), 0 1px 5px 0 rgba(60,75,100,.2); */

    & .header-profile {
        /* min-width: 200px; */
        margin-left: auto;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
    }

    & .header-profile div {
        /* margin-right: 20px; */
    }
    & .user-name {
        margin-top: 6px;
    }

`;

export const StyledNav = styled.li`
  list-style: none;
  border-bottom: 0.5px solid #252b32;

  display: -ms-flexbox;
  display: flex;
  flex: 1;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  & a {
    padding: 16px 0;
    padding-left: 20px;
    width: 100%;
    font-weight: 500;
    border-left: 4px solid transparent;
    transition: all ease 0.3s;
  }
  & a:hover, & a.active {
    background-color: #252b32;
    border-left: 4px solid #ffcd11;
  }
  & .MuiSvgIcon-root {
    margin-right: 2rem;
    position: relative;
    top: 5px;
  }
`;

export const StyledLogo = styled.div`
  width: 80%;
  height: 56px;
  overflow: hidden;
  background: #252b32;
  padding: 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    height: auto;
  }
`

export const StyledSubContainer = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 30px;
    background-color: #fff;
`

export const StyledFlex = styled.div`
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    align-items: stretch;
    width: 100%;

    ${(props) => props.smallWidth && css`
      max-width: 350px;
    `}

    ${(props) => props.right && css`
      margin-left: auto;
    `}
`

export const StyledBadge = styled.span`
    color: #fff;
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    ${(props) =>
    props.approved &&
    css`
      background-color: #2eb85c;
    `}

    ${(props) =>
    props.pending &&
    css`
      background-color: #f9b115;
    `}

    ${(props) =>
    props.inactive &&
    css`
      background-color: #636f83;
    `}
`

export const StyledPaginationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0;

    & p {
      flex: 0 0 41.66666667%;
      max-width: 41.66666667%;
    }

    & ul {
    flex: 0 0 58.33333333%;
    max-width: 58.33333333%;
    }
`

export const StyledChart = styled.div`
  width: 50%;
  min-width: 300px;
  margin: 0 1rem;
`