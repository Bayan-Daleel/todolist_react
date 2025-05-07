import "./App.css";
import Todolist from "./components/Todolist.jsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ToastProvider } from "./contexts/ToastContext.js";
import TodoProvider from "../src/contexts/TodoContext.js";
import { useEffect } from "react";
import { useTodo } from "./contexts/TodoContext.js"; // Import useTodo
import { LanguageProvider } from "../src/contexts/LanguageContext.js";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: "MyFont, sans-serif",
    },
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <TodoProvider>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#262B32",
            direction: "rtl",
            fontFamily: "MyFont",
          }}
        >
      <Todolist />
        </div>
      </ToastProvider>
      </TodoProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
