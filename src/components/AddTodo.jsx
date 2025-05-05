import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTodo } from "../contexts/TodoContext";

import { useToast } from "../contexts/ToastContext";

const AddTodo = () => {
  const {dispatch } = useTodo();
  const [addTodo, setAddTodo] = React.useState({ title: "", details: "" });
  const { setOpenSnakeBar, setTitleSnakeBar } = useToast();
  function handleAddClick() {
    // Add the new todo item to the list
    dispatch({
      type: "ADD_TODO",
      payload: addTodo,
    });
    setOpenSnakeBar(true);
    setTitleSnakeBar("تمت إضافة المهمة بنجاح");
    setAddTodo({ title: "", details: "" });
  }
  return (
    <Box
      sx={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        alignItems: "stretch",
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="ادخل المهمة"
        defaultValue="اسم المهمة"
        fullWidth
        sx={{ flex: 4, width: "100%" }}
        value={addTodo.title}
        onChange={(e) => setAddTodo({ ...addTodo, title: e.target.value })}
      />
      <Button
        onClick={handleAddClick}
        variant="contained"
        bgcolor="primary"
        sx={{
          width: "100%",
          color: "#fff",
          flex: 1,
        }}
        disabled={addTodo.title.length > 0 ? false : true}
      >
        {" "}
        إضافة
      </Button>
    </Box>
  );
};

export default AddTodo;
