import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,*::after,*::before{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html,body{
        width: 100%;
        height: 100%;
    }

    body{
        position: relative;
        background: url(${(props) => props.theme.bg_image}),${(props) => props.theme.bg};
        background-repeat: no-repeat;
        background-size: 100%;
        font-family: 'Josefin Sans', sans-serif;
        transition: all 0.2s ease-out;

        @media screen and (max-width: 750px) {
            background: url(${(props) => props.theme.bg_image_mobil}),${(props) => props.theme.bg};
            background-repeat: no-repeat;
            background-size: contain;
        }
        sub{
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: ${(props) => props.theme.text_clr};
            
        }
    }

    button{
    background-color: transparent;
    border: none;
    &:hover{
        cursor: pointer;
    }
}
`;
