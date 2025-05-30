import mockTasks from "../mock/tasks.json";

const MOCK_DELAY = 800;

export const taskApi = {
  async fetchTasks() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return mockTasks;
  },

  async updateTask(taskData) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return taskData;
  },

  async deleteTask(taskId) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return { success: true };
  },
};
