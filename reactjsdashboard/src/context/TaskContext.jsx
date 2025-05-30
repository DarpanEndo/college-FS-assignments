import { createContext, useContext, useReducer, useEffect } from "react";
import { taskApi } from "../services/taskApi";

const TaskContext = createContext();

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

const getUrgencyScore = (deadline, priority) => {
  const daysToDeadline =
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
  return daysToDeadline / priorityWeight[priority];
};

const initialState = {
  tasks: [],
  filteredPriority: "all",
  filteredStatus: "all",
  filteredCategory: "all",
  isLoading: false,
  error: null,
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
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const tasks = await taskApi.fetchTasks();
        dispatch({ type: "SET_TASKS", payload: tasks });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadTasks();
  }, []);

  // Filter and sort tasks
  const sortedAndFilteredTasks = state.tasks
    .filter(
      (task) =>
        (state.filteredPriority === "all" ||
          task.priority === state.filteredPriority) &&
        (state.filteredStatus === "all" ||
          task.status === state.filteredStatus) &&
        (state.filteredCategory === "all" ||
          task.category === state.filteredCategory)
    )
    .sort(
      (a, b) =>
        getUrgencyScore(a.deadline, a.priority) -
        getUrgencyScore(b.deadline, b.priority)
    );

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedAndFilteredTasks,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
