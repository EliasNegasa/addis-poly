import styled, { css } from "styled-components";

export const StyledCard = styled.div`
  overflow: hidden;
  padding: 3rem 3rem 5rem;
  width: 300px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background: #fff;

  ${props => props.loginCard && css`
    margin: 10% auto;
  `}

  ${props => props.left && css`
    margin: 45px auto 0;
  `}

  ${props => props.big && css`
      width: 500px;
  `}

  ${props => props.smallShadow && css`
      box-shadow: 0 0 10px rgba(0,0,0,0.05), 0 0px 5px rgba(0,0,0,0.08);
  `}
`;
