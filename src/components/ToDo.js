import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContexts";
// import Dialog related components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// other imports commented out
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ToDo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
    date: todo.date ? dayjs(todo.date) : null,
    duration: todo.duration ? dayjs(todo.duration, "HH:mm") : null,
  });

  const { todos, setTodos } = useContext(TodosContext);

  //  Event Handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // setShowDeleteDialog(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
          date: updatedTodo.date ? updatedTodo.date.format("YYYY-MM-DD") : "",
          duration: updatedTodo.duration
            ? updatedTodo.duration.format("HH:mm")
            : "",
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  // ======= Event Handlers ========

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Delete Dialog */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo a deletion once it has been done.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Disagree</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* ====== Delete Dialog  ====== */}
      {/* UpDate Dialog  */}
      <Dialog
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Task Information"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Task Title"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Task Date"
              value={updatedTodo.date}
              onChange={(newValue) => {
                setUpdatedTodo({ ...updatedTodo, date: newValue });
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  variant: "standard",
                },
              }}
            />

            <TimePicker
              label="Task Time"
              value={updatedTodo.duration}
              onChange={(newValue) => {
                setUpdatedTodo({ ...updatedTodo, duration: newValue });
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  variant: "standard",
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Disagree</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* ====== UpDate Dialog  ====== */}
      <Card
        sx={{
          // Card styles based on completion status مكمن تغير الالوان حسب الحالة
          minWidth: 275,
          backgroundColor: todo.isCompleted ? "#d3efcfff" : "#5065ccff",
          color: todo.isCompleted ? "#000" : "#FFF",
          border: todo.isCompleted
            ? "3px solid #8bc34a"
            : "3px solid transparent",
        }}
        className="todoCard"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                📅 {todo.date || "No date"}
              </Typography>

              <Typography variant="body2" sx={{ textAlign: "left" }}>
                ⏰ {todo.duration || "No time"}
              </Typography>
            </Grid>
            {/* Action Buttuns */}
            <Grid
              size={{ xs: 6, md: 4 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Icon Button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: todo.isCompleted ? "#FFF" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "#FFF",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ======== Check Icon Button =======*/}
              {/* Update Icon Button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#1679aa",
                  backgroundColor: "#FFF",
                  border: "solid #1679aa 3px",
                }}
              >
                <ModeEditIcon />
              </IconButton>
              {/* ======= Update Icon Button =======*/}
              {/* Delete Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  backgroundColor: "#FFF",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {/* ====== Delete Icon Button  ====== */}
              {/* ====== Action Buttuns  ======*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
