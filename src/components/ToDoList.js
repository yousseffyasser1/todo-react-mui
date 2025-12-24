import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../contexts/todosContexts";

// components
import ToDo from "./ToDo";
// other imports commented out
import { v4 as uuidv4 } from "uuid";

// import * as React from "react";
// import Button from "@mui/material/Button";
// import CardActions from "@mui/material/CardActions";
// icons imports commented out
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Filteration Arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("calling useEffect");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh" , overflow: "scroll"}} >
        <CardContent>
          <Typography style={{ fontFamily: "ScienceGothic" }} variant="h2">
            Day Tasks
          </Typography>
          <Divider
          // sx={{
          //   borderColor: "#000", // اللون
          //   borderWidth: "1px", // السماكة
          //   width: "100%", // العرض
          //   margin: "10px auto", // المسافة
          //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)", // الظل
          // }}
          />
          {/* FILTER BUTTONS */}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="all" aria-label="left aligned">
              All
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              Completed
            </ToggleButton>
            <ToggleButton value="non-completed" aria-label="right aligned">
              Incomplete
            </ToggleButton>
          </ToggleButtonGroup>
          {/* ===== FILTER BUTTONS ===== */}
          {/*  ALL TODOS */}
          {todosJsx}
          {/* ======= ALL TODOS =======*/}
          {/* INPUT + ADD BUTTON */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid size={{ xs: 6, md: 8 }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length == 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* ======== INPUT + ADD BUTTON ========*/}
        </CardContent>
      </Card>
    </Container>
  );
}
