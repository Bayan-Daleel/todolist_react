import React, { useMemo } from "react";
import Container from "@mui/material/Container";
import { Card, Divider, Typography, CardContent } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import  { useTodo } from "../contexts/TodoContext";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useToast } from "../contexts/ToastContext";

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Todolist = () => {
  const { todos,dispatch } = useTodo();
  const [alignment, setAlignment] = React.useState("all");
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [todoDelete, setTodoDelete] = React.useState(null); 
  const [editDialog, setEditDialog] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState({ id: "", title: "", details: "" });


  // hooks
  const {setOpenSnakeBar,setTitleSnakeBar}=useToast();
  const completeTodos = useMemo(
    () => todos?.filter((t) => t.status === true),
    [todos]
  );

  const NotCompleteTodos = useMemo(
    () =>
      todos?.filter((t) => {
        return t.status === false;
      }),
    [todos]
  );

  const allTodos = useMemo(
    () =>
      todos?.map((t) => {
        return t;
      }),
    [todos]
  );

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
    // Remove the todo item from the list
    dispatch({ type: "REMOVE_TODO", payload: todo });
    setDeleteDialog(false);
    setOpenSnakeBar(true);
    setTitleSnakeBar("تم حذف المهمة بنجاح");  
  }

    const handleEditClickOpen = (open ,todo) => {
      setEditDialog(true);
      setEditTodo({ id: todo.id, title: todo.title, details: todo.details });
    };
  
    const handleEditClose = () => {
      setEditDialog(false);
    };
  
    function handleEditConfirm() {
      // Open the edit modal or navigate to the edit page
      dispatch({
        type: "UPDATE_TODO",
        payload: editTodo,
      }); 
      setEditDialog(false); 
      setOpenSnakeBar(true);
    setTitleSnakeBar("تم تعديل المهمة بنجاح");
    }

  
  

  return (
    <>
      {/* Delet Dialog */}
      <React.Fragment>
        <Dialog
          sx={{ direction: "rtl" }}
          open={deleteDialog}
          onClose={handDeleteleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"هل أنت متأكد أنك تريد حذف هذه المهمة؟"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              في حال قمت بحذف المهمة لا يمكنك التراجع
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handDeleteleClose}>إغلاق</Button>
            <Button onClick={() => handleConfermDelete(todoDelete)} autoFocus>
              تأكيد
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

  {/* Edit Dialog */}
    <React.Fragment>
      <Dialog
      sx={{direction:"rtl"}}
        open={editDialog}
        onClose={handleEditClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"قم بتعديل المهمة كما تريد"}
          </DialogContentText>
          <TextField
            textAlign="right"
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.title} 
            onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })} 
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.details} 
            onChange={(e) => setEditTodo({ ...editTodo, details: e.target.value })} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button type="submit" onClick={()=>handleEditConfirm()}>تعديل</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

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
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              قائمة مهامي
            </Typography>
            <Divider />

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{ marginTop: "20px" }}
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="complete">المنجز</ToggleButton>
              <ToggleButton value="notComplete">غير المنجز</ToggleButton>
            </ToggleButtonGroup>

            <Container
              sx={{
                marginTop: "20px",
                direction: "rtl",
                overflow: "scroll",
                maxHeight: "42vh",
              }}
            >
              {showTodos?.map((t) => {
                return (
                  <Todo key={t.id} todo={t} openDelete={openDeleteDialog} openEdit={handleEditClickOpen}  />
                );
              })}
              {/* Add Todo */}
            </Container>
            <AddTodo />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Todolist;
