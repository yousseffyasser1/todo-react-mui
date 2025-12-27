import { useState, useEffect } from "react";
import { TodosContext } from "./todosContexts";

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // load from localStorage once
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storedTodos || []);
  }, []);

  // sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
