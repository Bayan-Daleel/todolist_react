import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { Card, Divider, Typography, CardContent } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import TodoContext from "../contexts/TodoContext";
import { useContext } from "react";

const Todolist = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [alignment, setAlignment] = React.useState("web");
  const [showTodos, setShowTodos] = React.useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("ListOfTodos"));
    setShowTodos(savedTodos);
    setTodos(savedTodos);
  }, []);

  function handleCompleteTodos() {
    const completeTodos = todos.filter((t) => {
      if (t.status === true) return t; 
    });
    setShowTodos(completeTodos);
  }

  function handleNotCompleteTodos() {
    const NotCompleteTodos = todos.filter((t) => {
      if (t.status === false) return t;
    });
    setShowTodos(NotCompleteTodos);
  }

  function handleAllTodos() {
    const AllTodos = todos.map((t) => {
      return t;
    });
    setShowTodos(AllTodos);
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const Alltodos =showTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  return (
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
            <ToggleButton value="all" onClick={handleAllTodos}>
              الكل
            </ToggleButton>
            <ToggleButton value="complete" onClick={handleCompleteTodos}>
              المنجز
            </ToggleButton>
            <ToggleButton value="notComplete" onClick={handleNotCompleteTodos}>
              غير المنجز
            </ToggleButton>
          </ToggleButtonGroup>

          <Container
            sx={{
              marginTop: "20px",
              direction: "rtl",
              overflow: "scroll",
              maxHeight: "42vh",
            }}
          >
            {Alltodos}
            {/* Add Todo */}
          </Container>
          <AddTodo />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Todolist;
