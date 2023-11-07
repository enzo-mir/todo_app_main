import { todoType, todosStore, valueTodo } from "../store/todos_store";
import deleteBtn from "../assets/images/icon-cross.svg";
import { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { Wrapper } from "../styles/ListOfTodosStyle";

export default function ListOfTodo() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [todos, setTodos] = todosStore((state) => [state.todos, state.setTodos]);
  const t: todoType = filter === "all" ? todos : filter === "active" ? todos.filter((x) => !x.complete) : todos.filter((x) => x.complete);
  const [filteredState, setFilteredState] = useState<todoType>(t);
  const draggingPos = useRef<number>();
  const dragOverPos = useRef<number | null>(null);

  useEffect(() => {
    setFilteredState(t);
  }, [filter, t, todos]);

  const handleDragEnter = (position: number) => {
    dragOverPos.current = position;
    const newItems = [...filteredState];
    const draggingItem = newItems[draggingPos.current!];
    if (!draggingItem) return;

    newItems.splice(draggingPos.current!, 1);
    newItems.splice(dragOverPos.current!, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = position;
    dragOverPos.current = null;

    setTodos(reorderedItems);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(reorderedItems), "mysecretkey").toString();
    sessionStorage.setItem("session_todo", encryptedData);
  };

  function changeTodosInformation(todo: valueTodo, e: React.ChangeEvent | null, type: "delete" | "complete") {
    const obj = [...todos];
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      if (element === todo) {
        if (type === "complete") {
          todo["complete"] = (e!.target as HTMLInputElement).checked;
        }
        if (type == "delete") {
          obj.splice(i, 1);
        }
      }
    }

    setTodos(obj);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), "mysecretkey").toString();
    sessionStorage.setItem("session_todo", encryptedData);
  }

  function deleteCompletedTodos() {
    const tableTodosNotComplete = todos.filter((x) => !x.complete);
    setTodos(tableTodosNotComplete);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(todos), "mysecretkey").toString();
    sessionStorage.setItem("session_todo", encryptedData);
  }

  const filter_element_table: Array<{ id: number; text: "All" | "Active" | "Completed" }> = [
    {
      id: 0,
      text: "All",
    },
    {
      id: 1,
      text: "Active",
    },
    {
      id: 2,
      text: "Completed",
    },
  ];

  return (
    <Wrapper>
      <aside>
        {todos.length ? (
          <ul>
            {todos.map((todo, index) => {
              return (todo.complete && filter === "completed") || (!todo.complete && filter === "active") || filter == "all" ? (
                <li
                  key={todo.id}
                  className="item"
                  draggable
                  onDragStart={() => {
                    draggingPos.current = index;
                  }}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <label htmlFor={`checker${todo.id.toString()}`}></label>
                  <input
                    type="checkbox"
                    name={`checker${todo.id.toString()}`}
                    id={`checker${todo.id.toString()}`}
                    defaultChecked={todo.complete}
                    onChange={(e) => changeTodosInformation(todo, e, "complete")}
                  />
                  <p>{todo.value}</p>
                  <button onClick={() => changeTodosInformation(todo, null, "delete")}>
                    <img src={deleteBtn} alt="" />
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        ) : (
          <div>
            <p>No todo</p>
          </div>
        )}
      </aside>
      <footer>
        <p>{todos.length ? `${todos.length} items left` : "0 item left"}</p>
        <ul>
          {filter_element_table.map((elem) => {
            return (
              <li
                onClick={() => setFilter(elem.text.toLowerCase() as "all" | "active" | "completed")}
                className={filter === elem.text.toLowerCase() ? "current" : ""}
                key={elem.id}
              >
                <button>{elem.text}</button>
              </li>
            );
          })}
        </ul>
        <ul>
          <li>
            <button onClick={deleteCompletedTodos}>Clear Completed</button>
          </li>
        </ul>
      </footer>
    </Wrapper>
  );
}
