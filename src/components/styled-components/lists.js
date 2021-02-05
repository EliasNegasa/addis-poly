import styled from "styled-components";

export const StyledListGroup = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;

    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    transition: all .2s;
    border-radius: .25rem;
`

export const StylesList = styled.li`
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.125);

    &:first-child {
        border-top-left-radius: .25rem;
        border-top-right-radius: .25rem;
    }

    &>div {
        display: flex;
        flex: 1;
        position: relative;
        align-items: center;
    }

    &>div>div {
        margin-right: 1rem !important;
        max-width: 700px;
    }

    & div.name {
        opacity: .8;
        font-size: 1.2rem;
    }

    & div.description {
        opacity: .5;
    }

    & div.icons-container {
        margin-left: auto;
    }
`