import { createContext, useContext, useReducer, useEffect } from "react";
import tasksData from "../mock/tasks.json";

const TaskContext = createContext();

const priorityWeight = { high: 3, medium: 2, low: 1 };

const getUrgencyScore = (deadline, priority) => {
  const days = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
  return days / priorityWeight[priority];
};

const initialState = {
  tasks: [],
  filteredPriority: "all",
  filteredStatus: "all",
  filteredCategory: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_PRIORITY_FILTER":
      return { ...state, filteredPriority: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, filteredStatus: action.payload };
    case "SET_CATEGORY_FILTER":
      return { ...state, filteredCategory: action.payload };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: tasksData });
  }, []);

  const filteredTasks = state.tasks
    .filter(
      (t) =>
        (state.filteredPriority === "all" ||
          t.priority === state.filteredPriority) &&
        (state.filteredStatus === "all" || t.status === state.filteredStatus) &&
        (state.filteredCategory === "all" ||
          t.category === state.filteredCategory)
    )
    .sort(
      (a, b) =>
        getUrgencyScore(a.deadline, a.priority) -
        getUrgencyScore(b.deadline, b.priority)
    );

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
