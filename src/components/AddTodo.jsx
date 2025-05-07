import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTodo } from "../contexts/TodoContext";
import { useToast } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
import LanguageContext  from "../contexts/LanguageContext";


const AddTodo = () => {
  const { dispatch } = useTodo();
  const [addTodo, setAddTodo] = React.useState({ title: "", details: "" });
  const { setOpenSnakeBar, setTitleSnakeBar } = useToast();
  const { t } = useTranslation();
  const {Lang , setLang }=useContext(LanguageContext)


  function handleAddClick() {
    dispatch({
      type: "ADD_TODO",
      payload: addTodo,
    });
    setOpenSnakeBar(true);
    setTitleSnakeBar(t("TASK_ADDED_SUCCESS"));
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
        direction:Lang === "ar" ? "rtl" : "ltr"
      }}
    >
      <TextField
        required
        id="outlined-required"
        label={t("ENTER_TASK")}
        fullWidth
        sx={{ flex: 4, width: "100%" }}
        value={addTodo.title}
        onChange={(e) => setAddTodo({ ...addTodo, title: e.target.value })}
      />
      <Button
        onClick={handleAddClick}
        variant="contained"
        sx={{
          width: "100%",
          color: "#fff",
          flex: 1,
        }}
        disabled={addTodo.title.length === 0}
      >
        {t("ADD")}
      </Button>
    </Box>
  );
};

export default AddTodo;
