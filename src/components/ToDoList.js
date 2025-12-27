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
import { useContext, useState } from "react";
import { useEffect } from "react";
import { TodosContext } from "../contexts/todosContexts";
import AddIcon from "@mui/icons-material/Add";

// components
import ToDo from "./ToDo";
// other imports commented out
import { v4 as uuidv4 } from "uuid";

// import Dialog related components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  const [todoInput, setTodoInput] = useState({
    title: "",
    details: "",
    duration: null,
    date: null,
  });
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Filteration Arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

 // التحميل في ال Providor 
  useEffect(() => {
  const storageTodos = JSON.parse(localStorage.getItem("todos"));
  setTodos(storageTodos);
}, [setTodos]);



  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: todoInput.title,
      details: todoInput.details,
      date: todoInput.date ? todoInput.date.format("YYYY-MM-DD") : "",
      duration: todoInput.duration ? todoInput.duration.format("HH:mm") : "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodoInput({
      title: "",
      details: "",
      duration: null,
      date: null,
    });

    handleAddDialogClose();
  }

  // ======= Event Handlers ========

  function handleAddDialogOpen() {
    setShowAddDialog(true);
  }

  function handleAddDialogClose() {
    setShowAddDialog(false);
  }

  function handleTodoInputChange(e) {
    const { name, value } = e.target;

    setTodoInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <Container maxWidth="md">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={showAddDialog} onClose={handleAddDialogClose}>
          <DialogTitle>Add New Todo</DialogTitle>

          <DialogContent>
            <TextField
              label="Title"
              name="title"
              fullWidth
              variant="standard"
              value={todoInput.title}
              onChange={handleTodoInputChange}
            />

            <TextField
              label="Details"
              name="details"
              fullWidth
              variant="standard"
              value={todoInput.details}
              onChange={handleTodoInputChange}
            />

            <DatePicker
              label="Due Date"
              value={todoInput.date}
              onChange={(newValue) =>
                setTodoInput((prev) => ({ ...prev, date: newValue }))
              }
              sx={{ mt: 2, width: "100%" }}
            />

            <TimePicker
              label="Time"
              value={todoInput.duration}
              onChange={(newValue) =>
                setTodoInput((prev) => ({ ...prev, duration: newValue }))
              }
              sx={{ mt: 2, width: "100%" }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button onClick={handleAddClick} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
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
          <Grid container style={{ marginTop: "20px" }}>
            {/* <Grid size={{ xs: 6, md: 8 }}>
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
            </Grid> */}
            <Grid size={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  width: "60%",
                  height: "50px",
                  fontSize: "18px",
                }}
                onClick={handleAddDialogOpen}
              >
                Add New Task
              </Button>
            </Grid>
          </Grid>
          {/* ======== INPUT + ADD BUTTON ========*/}
        </CardContent>
      </Card>
    </Container>
  );
}
