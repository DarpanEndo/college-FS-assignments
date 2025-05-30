import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskProvider } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import { taskApi } from "../services/taskApi";

jest.mock("../services/taskApi");

describe("TaskList", () => {
  const mockTasks = [
    {
      id: 1,
      title: "Urgent Task",
      description: "Test task",
      deadline: "2025-06-01T12:00:00Z",
      priority: "high",
      status: "todo",
      category: "work",
    },
    {
      id: 2,
      title: "Normal Task",
      description: "Test task 2",
      deadline: "2025-06-15T12:00:00Z",
      priority: "medium",
      status: "todo",
      category: "work",
    },
  ];

  beforeEach(() => {
    taskApi.fetchTasks.mockResolvedValue(mockTasks);
  });

  test("loads and displays tasks", async () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Urgent Task/i)).toBeInTheDocument();
    });
  });

  test("filters tasks by priority", async () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Urgent Task/i)).toBeInTheDocument();
    });

    const priorityFilter = screen.getByRole("combobox", { name: /priority/i });
    fireEvent.change(priorityFilter, { target: { value: "high" } });

    expect(screen.getByText(/Urgent Task/i)).toBeInTheDocument();
    expect(screen.queryByText(/Normal Task/i)).not.toBeInTheDocument();
  });

  test("sorts tasks by urgency score", async () => {
    const tasks = [
      {
        id: 1,
        title: "Far Deadline High Priority",
        deadline: "2025-12-01T12:00:00Z",
        priority: "high",
      },
      {
        id: 2,
        title: "Near Deadline Low Priority",
        deadline: "2025-06-01T12:00:00Z",
        priority: "low",
      },
    ];

    taskApi.fetchTasks.mockResolvedValue(tasks);

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    await waitFor(() => {
      const taskElements = screen.getAllByRole("heading");
      expect(taskElements[0].textContent).toBe("Near Deadline Low Priority");
    });
  });

  test("highlights overdue tasks", async () => {
    const overdueTasks = [
      {
        id: 1,
        title: "Overdue Task",
        deadline: "2023-01-01T12:00:00Z",
        priority: "high",
      },
    ];

    taskApi.fetchTasks.mockResolvedValue(overdueTasks);

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    await waitFor(() => {
      const taskElement = screen.getByText(/Overdue Task/i).closest("div");
      expect(taskElement).toHaveStyle({ backgroundColor: "#fff0f0" });
    });
  });
});
