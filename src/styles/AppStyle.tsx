import styled from "styled-components";
export const Wrapper = styled.main`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translate(-50%, 0%);
  display: grid;
  grid-template-rows: auto 1fr;
  width: clamp(400px, 40vw, 600px);
  gap: 50px;

  @media screen and (max-width: 900px) {
    top: 0;
    padding: 2em 1em;
    width: 100%;
    min-width: 0;
    gap: 20px;
  }

  & > * {
    width: 100%;
  }

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      color: #fff;
      letter-spacing: 0.5ch;
    }
  }

  section {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    & > div {
      display: flex;
      gap: 20px;
      background-color: ${(props) => props.theme.card_bg};
      padding: 1.2em;
      border-radius: 5px;

      box-shadow: 0px -10px 50px -20px ${(props) => props.theme.shadow};

      span {
        width: 25px;
        aspect-ratio: 1 / 1;
        border: 1px solid ${(props) => props.theme.text_line_through};
        border-radius: 50%;
      }
      input {
        border: none;
        background-color: transparent;
        width: 100%;
        outline: none;
        color: ${(props) => props.theme.text_clr};
      }
    }
  }
`;
