import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme , ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContexts";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "ScienceGothic",
  },
  palette: {
    primary: {
      main: "#00897b"
    }
  }
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "First Task",
    details: "First Task Description",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task",
    details: "Second Task Description",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task",
    details: "Third Task Description",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#191b1f",
      }}
    >
      <TodosContext.Provider value={{ todos, setTodos }}>
      <ToDoList />
      </TodosContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
