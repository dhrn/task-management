import { useState } from "react";
import { Task, TaskFormProps, TaskStatus } from "./types";

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TO_DO);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.TO_DO);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Form validation
    addTask({ title, description, status } as Task);
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen}>Add Task</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <div className="modal-title">
            Add Task
            <span className="close" onClick={handleClose}>
              &times;
            </span>
          </div>
          
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              ></textarea>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                required
              >
                <option value={TaskStatus.TO_DO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.DONE}>Done</option>
              </select>

              <div className="modal-actions">
                <button type="submit">Add Task</button>
                <button className="button-delete" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
