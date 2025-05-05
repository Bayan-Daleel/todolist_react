import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { useToast } from "../contexts/ToastContext";
import { useTodo } from "../contexts/TodoContext";

const Todo = ({ todo ,openDelete ,openEdit }) => {
  const { dispatch } = useTodo();
  const { setOpenSnakeBar, setTitleSnakeBar } = useToast();

  // Function to handle the click event of the "done" button
  function handleDoneClick(todo) {
    // Update the status of the todo item to "done"
    dispatch({
      type: "DONE_TODO",
      payload: todo,
    });
    setOpenSnakeBar(true);
    setTitleSnakeBar("تم تغيير حالة المهمة بنجاح"); 
  }

  return (
    <>
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
              onClick={() => handleDoneClick(todo)}
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
              onClick={() => openEdit(true,todo)}
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
              onClick={() =>openDelete(true,todo)}
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
