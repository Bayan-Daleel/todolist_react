import { createContext , useContext } from "react";
import React, { useState } from "react";
import Snakebar from "../components/Snakebar";      


const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [openSnakeBar, setOpenSnakeBar] = useState(false);
  const [titleSnakeBar, setTitleSnakeBar] = useState("");
  // HANDELERS
  const handleCloseSnake = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakeBar(false);
  };

  const handleClickSnake = () => {
    setOpenSnakeBar(true);
  };
  return (
    <ToastContext.Provider
      value={{
        setTitleSnakeBar,
        setOpenSnakeBar,
        setTitleSnakeBar,
        handleClickSnake,
        handleCloseSnake,
      }}
    >
  <Snakebar openSnakeBar={openSnakeBar} handleCloseSnake={handleCloseSnake} titleSnakeBar={titleSnakeBar}/>

      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use ToastContext
export const useToast = () => {
  return useContext(ToastContext);
};