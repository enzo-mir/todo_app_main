import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themeStore } from "./store/theme.store";
import ListOfTodo from "./components/ListOfTodo";
import { todosStore } from "./store/todos_store";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";
import CryptoJS from "crypto-js";

const Wrapper = styled.main`
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

function App() {
  const [currentTheme, setCurrentTheme] = themeStore((state) => [state.currentTheme, state.setCurrentTheme]);
  const [todos, setTodos] = todosStore((state) => [state.todos, state.setTodos]);

  function submitNewTodo(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const allId = todos.map((todo) => todo.id);
      setTodos([
        ...todos,
        {
          id: allId.length ? Math.max(...allId) + 1 : 1,
          value: (e.target as HTMLInputElement).value.trim(),
          complete: false,
        },
      ]);
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify([
          ...todos,
          {
            id: allId.length ? Math.max(...allId) + 1 : 1,
            value: (e.target as HTMLInputElement).value.trim(),
            complete: false,
          },
        ]),
        "mysecretkey"
      ).toString();
      sessionStorage.setItem("session_todo", encryptedData);
      (e.target as HTMLInputElement).value = "";
    }
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Wrapper>
        <header>
          <h1>TODO</h1>
          <button
            onClick={() => {
              setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
              sessionStorage.setItem("theme", currentTheme === lightTheme ? "dark" : "light");
            }}
          >
            <img src={currentTheme().image_theme} alt="" />
          </button>
        </header>
        <section>
          <div>
            <span></span>
            <input type="text" name="" id="" placeholder="Create a new todo..." autoFocus onKeyDown={submitNewTodo} />
          </div>
          <ListOfTodo />
        </section>
      </Wrapper>
      <sub>Drag and drop to reorder the list</sub>
    </ThemeProvider>
  );
}

export default App;
