import { render, screen, fireEvent } from "@testing-library/react";
import { TaskProvider } from "../context/TaskContext";
import TaskList from "../components/TaskList";

test("filters tasks by priority", () => {
  render(
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );

  const dropdown = screen.getByRole("combobox");
  fireEvent.change(dropdown, { target: { value: "high" } });

  const tasks = screen.getAllByText(/Priority:/i);
  tasks.forEach((task) => expect(task.textContent).toMatch(/high/i));
});
