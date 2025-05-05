import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";
import { v4 as uvidv4 } from "uuid";

const TodoContext = createContext([]);

const TodoReducer = (state, action) => {
  switch (action.type) {
    case "GIT_ALL_TODOS":
      return JSON.parse(localStorage.getItem("ListOfTodos")) || [];

    case "ADD_TODO":
      const newTodo = {
        id: uvidv4(),
        title: action.payload.title,
        details: "",
        status: false,
      };
      const newTodos = [...state, newTodo];
      // Save the updated list to localStorage
      localStorage.setItem("ListOfTodos", JSON.stringify(newTodos));
      return newTodos;

    case "DONE_TODO":
    console.log(action.payload.id);   
   const updatedTodos = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
      // Save the updated list to localStorage
      localStorage.setItem("ListOfTodos", JSON.stringify(updatedTodos));
      return updatedTodos;
    // Save the updated list to localStorage

    case "REMOVE_TODO":
      const filteredTodos = state.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("ListOfTodos", JSON.stringify(filteredTodos));
      return filteredTodos;

    case "UPDATE_TODO":
      const modifiedTodos = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return todo;
      });
      localStorage.setItem("ListOfTodos", JSON.stringify(modifiedTodos));
      return modifiedTodos;

    default:
      return "ACTION TYPE NOT EXIST";
  }
};

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, []);

 useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("ListOfTodos"));
    if (storedTodos) {
      dispatch({ type: "GIT_ALL_TODOS", payload: storedTodos });
    }
  }, []);


  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
export const useTodo = () => {
  return useContext(TodoContext);
};
