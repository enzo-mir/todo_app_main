import styled from "styled-components";

export const Wrapper = styled.article`
  box-shadow: 0px 0px 30px -20px ${(props) => props.theme.shadow};
  border-radius: 10px;
  color: ${(props) => props.theme.text_clr};

  aside {
    > div {
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.text_line_through};
      gap: 20px;
      background-color: ${(props) => props.theme.card_bg};
      padding: 1.2em;
    }
    ul {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      max-height: 50vh;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
      }
      &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.scrollbar};
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: #fff;
      }
      & > li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${(props) => props.theme.text_line_through};
        gap: 20px;
        background-color: ${(props) => props.theme.card_bg};
        padding: 1.2em;

        & p {
          width: 100%;
        }
        @media screen and (min-width: 900px) {
          button {
            transition: all 0.3s ease-out;
            transform: translateY(-50%);
            opacity: 0;
            visibility: hidden;
          }
        }
        @media screen and (max-width: 900px) {
          button img {
            width: 90%;
          }
        }
        &:hover {
          button {
            transform: translateY(0%);
            opacity: 1;
            visibility: visible;
          }
        }
        & > input {
          display: none;
        }
        label {
          position: relative;
          display: grid;
          place-items: center;
          width: 25px;
          aspect-ratio: 1 / 1;
          outline: 1px solid ${(props) => props.theme.text_line_through};
          border-radius: 50%;
          &:hover {
            cursor: pointer;
          }
        }
        &:not(:has(input:checked)) label:hover {
          outline: none;
          background: ${(props) => props.theme.gradient_check};
          &::after {
            content: "";
            position: absolute;
            width: calc(100% - 2px);
            aspect-ratio: 1 / 1;
            background: ${(props) => props.theme.card_bg};
            background-position: center;
            background-size: 75%;
            background-repeat: no-repeat;
            border-radius: 50%;
            z-index: 5;
          }
        }

        &:has(input:checked) {
          p {
            text-decoration: line-through;
            color: ${(props) => props.theme.text_line_through};
          }
          label {
            background: ${(props) => props.theme.gradient_check};
            outline: none;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              background: url(${(props) => props.theme.image_checker});
              background-position: center;
              background-size: 75%;
              background-repeat: no-repeat;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  footer {
    position: relative;
    display: flex;
    padding: 1.2em;
    justify-content: space-between;
    background-color: ${(props) => props.theme.card_bg};
    color: ${(props) => props.theme.text_line_through};

    ul {
      display: flex;
      gap: 20px;
      li {
        list-style-type: none;
        button {
          color: ${(props) => props.theme.text_line_through};
        }
        &.current {
          button {
            color: ${(props) => props.theme.acitve_link};
          }
        }
        &:hover {
          cursor: grab;

          &:not(&.current) {
            button {
              color: ${(props) => props.theme.active_link_hover};
            }
          }
        }
      }
    }

    @media screen and (max-width: 900px) {
      ul:nth-child(2) {
        position: absolute;
        justify-content: center;
        border-radius: 5px;
        bottom: -150%;
        left: 50%;
        transform: translateX(-50%);
        background: ${(props) => props.theme.card_bg};
        width: 100%;
        padding: 1em;
        box-shadow: 0 0 15px -10px ${(props) => props.theme.shadow};
      }
    }
  }
`;
