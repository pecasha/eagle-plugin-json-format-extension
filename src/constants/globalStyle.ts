import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        color: ${({theme}) => theme.FULL_WHITE} !important;
        font-weight: 400;
        font-size: 16px;
        background-color: transparent !important;
    }

    * {
        -webkit-tap-highlight-color: transparent;
        scroll-behavior: smooth !important;
    }

    .hide {
        display: none;
    }

    .mantine-Modal-inner {
        padding: 0;
    }

    svg {
        vertical-align: text-top;
    }

    a {
        color: unset;
        text-decoration: none;
    }

    button {
        border: none;
        outline: none;
        background: transparent;
        width: fit-content;
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
`;

export default GlobalStyle;
