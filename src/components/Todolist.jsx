import React, { useContext, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import { Card, Divider, Typography, CardContent } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useTodo } from "../contexts/TodoContext";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useToast } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
import LanguageContext from "../contexts/LanguageContext"

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Todolist = () => {
  const { todos, dispatch } = useTodo();
  const [alignment, setAlignment] = React.useState("all");
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [todoDelete, setTodoDelete] = React.useState(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState({ id: "", title: "", details: "" });
  const { t, i18n } = useTranslation();
  const {Lang , setLang }=useContext(LanguageContext)
  
  // hooks
  const { setOpenSnakeBar, setTitleSnakeBar } = useToast();

  const completeTodos = useMemo(() => todos?.filter((t) => t.status === true), [todos]);
  const NotCompleteTodos = useMemo(() => todos?.filter((t) => t.status === false), [todos]);
  const allTodos = useMemo(() => todos?.map((t) => t), [todos]);

  let showTodos = todos;
  if (alignment === "complete") {
    showTodos = completeTodos;
  } else if (alignment === "notComplete") {
    showTodos = NotCompleteTodos;
  }

  // handlers
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const openDeleteDialog = (open, todo) => {
    setDeleteDialog(open);
    setTodoDelete(todo);
  };

  const handDeleteleClose = () => {
    setDeleteDialog(false);
  };

  const handleConfermDelete = (todo) => {
    handleDeleteClick(todo);
  };

  function handleDeleteClick(todo) {
    dispatch({ type: "REMOVE_TODO", payload: todo });
    setDeleteDialog(false);
    setOpenSnakeBar(true);
    setTitleSnakeBar(t("Task deleted successfully"));
  }

  const handleEditClickOpen = (open, todo) => {
    setEditDialog(true);
    setEditTodo({ id: todo.id, title: todo.title, details: todo.details });
  };

  const handleEditClose = () => {
    setEditDialog(false);
  };

  function handleEditConfirm() {
    dispatch({ type: "UPDATE_TODO", payload: editTodo });
    setEditDialog(false);
    setOpenSnakeBar(true);
    setTitleSnakeBar(t("Task updated successfully"));
  }

  function hundleLanguge() {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang);
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "ar";
    setLang(storedLang);
    i18n.changeLanguage(storedLang);
  }, []);

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        sx={{ direction:Lang === "ar" ? "rtl" : "ltr" }}
        open={deleteDialog}
        onClose={handDeleteleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("Are you sure you want to delete this task?")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("If you delete the task, you can't undo this action.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handDeleteleClose}>{t("Close")}</Button>
          <Button onClick={() => handleConfermDelete(todoDelete)} autoFocus>
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        sx={{ direction:Lang === "ar" ? "rtl" : "ltr" }}
        open={editDialog}
        onClose={handleEditClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>{t("Edit")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("Edit the task as you like")}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            label={t("Title")}
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            name="details"
            label={t("Details")}
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.details}
            onChange={(e) => setEditTodo({ ...editTodo, details: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>{t("Cancel")}</Button>
          <Button type="submit" onClick={handleEditConfirm}>
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Container */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
          direction: "rtl",
        }}
      >
        <Card>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                direction: Lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ textAlign: "center", fontWeight: "bold" }}>
                {t("My Todo List")}
              </Typography>
              <Button
                variant="contained"
                sx={{ marginTop: "20px", marginBottom: "20px" }}
                onClick={hundleLanguge}
              >
                {Lang === "ar" ? "English" : "العربية"}
              </Button>
            </div>
            <Divider />

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{ marginTop: "20px", 
                direction:Lang === "ar" ? "rtl" : "ltr",
               }}
            >
              <ToggleButton value="all">{t("ALL")}</ToggleButton>
              <ToggleButton value="complete">{t("Completed")}</ToggleButton>
              <ToggleButton value="notComplete">{t("Not Completed")}</ToggleButton>
            </ToggleButtonGroup>

            <Container
              sx={{
                marginTop: "20px",
                overflow: "scroll",
                maxHeight: "42vh",
                direction:Lang === "ar" ? "rtl" : "ltr",
              }}
            >
              {showTodos?.map((t) => (
                <Todo key={t.id} todo={t} openDelete={openDeleteDialog} openEdit={handleEditClickOpen} />
              ))}
            </Container>

            <AddTodo />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Todolist;
