import styled, { css } from "styled-components";

export const StyledHeading = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
`;

export const StyledSubHeading = styled(StyledHeading)`
  font-size: 1.6rem;
  
  ${props => props.padding && css`
    padding-bottom: 1rem; 
  `}

  ${props =>
    props.left && css`
      text-align: left;
      font-weight: 400;
      margin: 0;
    `
  }

  ${props =>
    props.small && css`
      font-size: 16px;
    `
  }
`;
