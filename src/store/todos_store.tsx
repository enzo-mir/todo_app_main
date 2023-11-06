import { StateCreator, create } from "zustand";
import CryptoJS from "crypto-js";
export type valueTodo = {
  id: number;
  complete: boolean;
  value: string;
};

export type todoType = Array<valueTodo> | [];

interface todosStoreType {
  todos: todoType;
  setTodos: (val: todoType) => void;
}

const todosTypeStore: StateCreator<todosStoreType> = (set) => ({
  todos: sessionStorage.getItem("session_todo")
    ? JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem("session_todo")!, "mysecretkey").toString(CryptoJS.enc.Utf8))
    : [],
  setTodos: (val) => set({ todos: val }),
});

export const todosStore = create<todosStoreType>((...a) => ({
  ...todosTypeStore(...a),
}));
