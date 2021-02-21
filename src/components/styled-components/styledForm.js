import styled, { css } from "styled-components";
import searchIcon from "../../searchicon.png";

export const StyledInput = styled.input`
  padding: 10px 6px;
  margin: 1rem 0;
  background: #f9f9f9;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  width: 100%;

  ${(props) =>
    props.half &&
    css`
      width: 50%;
    `}

  &:focus {
    border-bottom-color: ${(props) => props.theme.primary};
    outline: 0;
  }
`;

export const StyledSelect = styled.select`
  padding: 10px 0;
  margin: 1rem 0;
  background: #f9f9f9;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: ${(props) => props.theme.primary};
    outline: 0;
  }
`;

export const Message = styled.span`
  width: 100%;
  display: block;
  padding: 3px 10px;
  top: 0;
  z-index: 9999;
  font-size: 12px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;

  color: #aa2323;
  background-color: #f6d6d6;

  ${(props) =>
    props.success &&
    css`
      color: #270;
      background-color: #dff2bf;
    `}
`;

export const StyledTextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    border: 1px solid;
    background: #f9f9f9;
    border-color: #e4e7ea;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    height: auto;
    min-height: 150px;

  ${(props) =>
    props.half &&
    css`
      width: 50%;
    `}

  &:focus {
    border-bottom-color: ${(props) => props.theme.primary};
    outline: 0;
  }
`;

export const StyledSearch = styled.input`
  padding: 6px 8px 6px 72px;
  width: 280px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  background-position: 10px 10px; 
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  padding: 10px 20px 10px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
`

export const StyledFormContainer = styled.div`
  width: 48%;
  max-width: 540px;
  display: inline-block;
  vertical-align: top;
  
  & .field-div {
    margin: 15px 0px 15px 0px;
  }
  & .double-field {
    width: 100%;
    display: flex;
    justify-content: space-between;  

    & .field-div {
    width: 50%;
    margin: 0 0px 0px 0;
    }  
  }
  & .login-form .field-div {
    margin-left: auto;
    margin-right: auto;
  }

  & .field-div .date-picker {
    font: inherit;
    width: 100%;
    height: 1.1876em;
    display: block;
    padding: 23.5px 14px !important;
    border-radius: 4px;
    border-color: rgba(0, 0, 0, 0.23);
    border-width: 1px;

  }

  & .field-div .react-datepicker-wrapper {
    width: 100%;
  }

  ${(props) =>
    props.threeColumn &&
    css`
      width: 33.333%;
    `}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      max-width: 95%;
      margin: 6rem auto 1rem;
      display: block;
    `}

    ${(props) =>
    props.oneColumn &&
    css`
      width: 100%;
    `}
`