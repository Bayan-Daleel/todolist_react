import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [editDialog, setEditDialog] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState({ id: todo.id, title: todo.title, details: todo.details });
  
  const handleEditClickOpen = () => {
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
  };

  const handleConfermDelete = (id) => {
    handleDeleteClick(id);
  };

  const handDeleteleClose = () => {
    setDeleteDialog(false);
  };

  function handleDoneClick(id) {
    // Update the status of the todo item to "done"
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
         { todo.status= !todo.status };
      }
      return todo;
    });
    setTodos(updatedTodos);
        localStorage.setItem("ListOfTodos",JSON.stringify(updatedTodos))
  }

  function handleEditConfirm() {
    // Open the edit modal or navigate to the edit page
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return {...todo, title: editTodo.title, details: editTodo.details };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("ListOfTodos",JSON.stringify(updatedTodos))
    setEditDialog(false); 
  }

  function handleDeleteClick(id) {
    // Remove the todo item from the list
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("ListOfTodos",JSON.stringify(updatedTodos))
    setDeleteDialog(false);
  }


  return (
    <>
    {/* Delet Dialog */}
    <React.Fragment>
      <Dialog
        sx={{direction:"rtl"}}
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
          <Button onClick={()=>handleConfermDelete(todo.id)} autoFocus>
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
        <DialogTitle>تعديل  {todo.title}</DialogTitle>
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
            autoFocus
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

      <Box
        sx={{
          flexGrow: 1,
          borderRadius: "10px",
          margin: "10px",
          backgroundColor: "#252F88",
        }}
        className="todo"
      >
        {/* Todo */}
        <Grid
          container
          spacing={2}
          padding="15px"
          borderRadius="10px"
          marginTop="20px"
          direction="rtl"
        >
          <Grid size={8} textAlign={"right"}>
            <Typography variant="h5" sx={{ fontWeight: "bold" ,textDecoration: todo.status ? "line-through" : "none"}}>
              {" "}
              {todo.title}
            </Typography>
            <Typography variant="h6">{todo.details}</Typography>
          </Grid>
          {/* icons */}
          <Grid container size={4} spacing={1} alignContent={"center"}>
            <IconButton
              size="small"
              className="icons"
              style={{
                color:todo.status ? "#fff": "#8bc34a",
                background: todo.status ? "#8bc34a" : "#fff",
                borderRadius: "50%",
                border: "1px solid green",
              }}
              onClick={() => handleDoneClick(todo.id)}
            >
              <DoneIcon
                sx={{
                  color: "#fff",
                  stroke: "green",
                }}
              />
            </IconButton>

            <IconButton
              size="small"
              className="icons"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
              onClick={() => handleEditClickOpen()}
            >
              <EditIcon
                sx={{
                  color: "#fff",
                  stroke: "blue",
                }}
              />
            </IconButton>

            <IconButton
              size="small"
              className="icons"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                border: "1px solid red",
              }}
              onClick={() =>setDeleteDialog(true)}
            >
              <DeleteIcon
                size="small"
                sx={{
                  color: "#fff",
                  stroke: "red",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Todo;
