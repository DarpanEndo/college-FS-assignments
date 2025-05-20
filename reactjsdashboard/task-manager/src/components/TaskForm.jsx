import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormContainer = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  max-width: 600px;
  margin: 20px auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea,
  select {
    padding: 0.8rem;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    font-size: 1rem;
    &:focus {
      border-color: #b5e6b5;
      outline: none;
    }
  }

  button {
    background: #b5e6b5;
    color: #4a4a4a;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
      background: #98d698;
    }
  }
`;

const TaskForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      status: "todo",
      category: "personal",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Task Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="3"
        />
        <input
          type="datetime-local"
          value={formData.deadline}
          onChange={(e) =>
            setFormData({ ...formData, deadline: e.target.value })
          }
          required
        />
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="urgent">Urgent</option>
          <option value="study">Study</option>
        </select>
        <button type="submit">
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </StyledForm>
    </FormContainer>
  );
};

export default TaskForm;
