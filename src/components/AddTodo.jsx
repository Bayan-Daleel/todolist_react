import React from 'react'
import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";
import Todo from './Todo';
import { stringify } from 'uuid';

const AddTodo = () => {
   const{todos ,setTodos} = useContext(TodoContext);
   const [addTodo ,setAddTodo] = React.useState({title:"", details:""});

   function handleAddClick(){
    // Add the new todo item to the list
    const newTodo = {
      title: addTodo.title,
      details: "",
      status: false,
    };
    const newTodos= [...todos,newTodo]
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    localStorage.setItem("ListOfTodos",JSON.stringify(newTodos))
    console.log(JSON.parse(localStorage.getItem("ListOfTodos")))
    setAddTodo({ title: "", details: "" });
   }
  return (
    <Box
  sx={{
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    alignItems:"stretch",
  }}
>
  <TextField
    required
    id="outlined-required"
    label="ادخل المهمة"
    defaultValue="اسم المهمة"
    fullWidth
    sx={{ flex: 4 , width:"100%"}}
    value={addTodo.title}
    onChange={(e) => setAddTodo({ ...addTodo, title: e.target.value })}  
  />
  <Button
  onClick={handleAddClick}
    sx={{ bgcolor: "red",
        width:"100%" ,
        color: "#fff", 
        flex: 1 }}
  > إضافة
  </Button>
</Box>
  )
}

export default AddTodo