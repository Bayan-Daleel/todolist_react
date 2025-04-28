import logo from './logo.svg';
import './App.css';
import Todolist from './components/Todolist.jsx'; 
import { ThemeContext ,ThemeProvider } from '@emotion/react'; 
import { createTheme } from '@mui/material';
import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoContext from '../src/contexts/TodoContext.js';

const initialTodoList=[
  {
    id:uuidv4(),
    title:"المهمة 1",
    details:"تفاصيل المهمة الاولى",
    status:false,
  },
  {
    id:uuidv4(),
    title:"المهمة 2",
    details:"تفاصيل المهمة الثانية",  
    status:false,
  },
  {
    id:uuidv4(),
    title:"المهمة 3",
    details:"تفاصيل المهمة الثالثة",
    status:false,
  },
  {
    id:uuidv4(),
    title:"المهمة 4",
    details:"تفاصيل المهمة الرابعة",
    status:false,
  },
  {
    id:uuidv4(),
    title:"المهمة 5",
    details:"تفاصيل المهمة 5",
    status:false,
  },
]
function App() {

  // const TodoProvider = ({children})=>{
  //   return(
  //     <TodoContext.Provider value={{todos ,setTodos}}>
  //       {children}
  //     </TodoContext.Provider>
  //   )
  // }

  const theme = createTheme({
    typography: {
      fontFamily: 'MyFont, sans-serif',
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
const [todos ,setTodos]=useState(initialTodoList)
  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{display:"flex" ,alignItems:"center",justifyContent:"center",height:"100vh" , backgroundColor:"#262B32", direction:"rtl" ,fontFamily:"MyFont"}}> 
    <TodoContext.Provider value={{todos ,setTodos}}>  
    <Todolist/>
    </TodoContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
