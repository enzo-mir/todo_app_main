import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themeStore } from "./store/theme.store";
import ListOfTodo from "./components/ListOfTodo";
import { todosStore } from "./store/todos_store";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";
import CryptoJS from "crypto-js";
import { Wrapper } from "./styles/AppStyle";

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
