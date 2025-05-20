import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { useTasks } from "../context/TaskContext";
import styled from "styled-components";
import { motion } from "framer-motion";

const FilterContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const StyledSelect = styled(motion.select)`
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border-radius: 12px;
  border: 2px solid #e8e8e8;
  background: white;
  font-size: 1rem;
  font-family: "Comic Sans MS", cursive;
  color: #4a4a4a;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.8rem auto;
  min-width: 200px;

  &:focus {
    border-color: #d7b5ff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(215, 181, 255, 0.2);
  }

  option {
    padding: 10px;
    font-family: "Comic Sans MS", cursive;
  }

  &::before {
    content: "🔍";
    margin-right: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CreateTaskButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ffb5b5 0%, #d7b5ff 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-family: "Comic Sans MS", cursive;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "✨";
    margin-right: 8px;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-family: "Comic Sans MS", cursive;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0.5rem;
  color: #4a4a4a;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.variant === "edit" &&
    `
    background: linear-gradient(135deg, #B5E6B5 0%, #98D698 100%);
    &::before {
      content: "✏️";
      margin-right: 8px;
    }
  `}

  ${(props) =>
    props.variant === "delete" &&
    `
    background: linear-gradient(135deg, #FFB5B5 0%, #FF9EAE 100%);
    &::before {
      content: "🗑️";
      margin-right: 8px;
    }
  `}

  /* Paper texture effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.1;
    pointer-events: none;
  }

  /* Shadow and hover effects */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const TaskList = () => {
  const { tasks, dispatch } = useTasks();
  const [showForm, setShowForm] = useState(false);

  const handleCreateTask = (taskData) => {
    dispatch({
      type: "ADD_TASK",
      payload: { ...taskData, id: Date.now() },
    });
    setShowForm(false);
  };

  return (
    <div>
      <FilterContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledSelect
          onChange={(e) =>
            dispatch({ type: "SET_PRIORITY_FILTER", payload: e.target.value })
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="all">🎯 All Priorities</option>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </StyledSelect>

        <StyledSelect
          onChange={(e) =>
            dispatch({ type: "SET_STATUS_FILTER", payload: e.target.value })
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="all">📋 All Statuses</option>
          <option value="todo">📝 To Do</option>
          <option value="inProgress">⏳ In Progress</option>
          <option value="done">✅ Done</option>
        </StyledSelect>

        <StyledSelect
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY_FILTER", payload: e.target.value })
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="all">🗂️ All Categories</option>
          <option value="personal">👤 Personal</option>
          <option value="work">💼 Work</option>
          <option value="urgent">⚡ Urgent</option>
          <option value="study">📚 Study</option>
        </StyledSelect>
      </FilterContainer>

      <CreateTaskButton
        onClick={() => setShowForm(!showForm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showForm ? "✖️ Cancel" : "✨ Create New Task"}
      </CreateTaskButton>

      {showForm && <TaskForm onSubmit={handleCreateTask} />}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={(id) => dispatch({ type: "DELETE_TASK", payload: id })}
          onUpdate={(taskData) =>
            dispatch({ type: "UPDATE_TASK", payload: taskData })
          }
        />
      ))}
    </div>
  );
};

export default TaskList;
