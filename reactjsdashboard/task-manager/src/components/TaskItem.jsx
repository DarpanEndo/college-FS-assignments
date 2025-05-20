import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledTaskItem = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 15px;
  position: relative;
  border: 2px solid #e8e8e8;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 20px;
    width: 30px;
    height: 35px;
    background: ${(props) =>
      props.priority === "high"
        ? "#FFB5B5"
        : props.priority === "medium"
        ? "#B5E6B5"
        : "#D7B5FF"};
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    transform: rotate(-45deg);
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }

  h3 {
    color: #4a4a4a;
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding-left: 35px;
    &::before {
      content: "✏️";
      margin-right: 8px;
    }
  }

  p {
    color: #666;
    margin: 8px 0;
    padding-left: 35px;
    &::before {
      content: "📌";
      margin-right: 8px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled(motion.button)`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${(props) =>
    props.variant === "edit"
      ? "#4CAF50"
      : props.variant === "delete"
      ? "#F44336"
      : "#e0e0e0"};
  color: #fff;
`;

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isOverdue = new Date(task.deadline) < new Date();

  if (isEditing) {
    return (
      <TaskForm
        initialData={task}
        onSubmit={(data) => {
          onUpdate(data);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <StyledTaskItem
      priority={task.priority}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: isOverdue ? "#fff0f0" : "#ffffff",
        transform: isExpanded ? "scale(1.05)" : "scale(1)",
      }}
    >
      <motion.h3>{task.title}</motion.h3>
      <motion.p>{task.description}</motion.p>
      <motion.p>Deadline: {new Date(task.deadline).toLocaleString()}</motion.p>
      <motion.p>Priority: {task.priority}</motion.p>
      <motion.p>Status: {task.status}</motion.p>
      <motion.p>Category: {task.category}</motion.p>

      <ButtonGroup onClick={(e) => e.stopPropagation()}>
        <ActionButton
          variant="edit"
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            delay: 0.1,
          }}
        >
          Edit
        </ActionButton>
        <ActionButton
          variant="delete"
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            delay: 0.2,
          }}
        >
          Delete
        </ActionButton>
      </ButtonGroup>
    </StyledTaskItem>
  );
};

export default TaskItem;
