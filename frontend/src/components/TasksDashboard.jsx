import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./TasksDashboard.css";

const TasksDashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      // Ensure tasks is always an array
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load your tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "" });
    setEditingId(null);
    setError("");
    setMessage("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (editingId) {
        const res = await api.put(`/tasks/${editingId}`, form);
        setMessage(res.data.message || "Task updated successfully");
      } else {
        const res = await api.post("/tasks", form);
        setMessage(res.data.message || "New task added");
      }
      resetForm();
      fetchTasks();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Operation failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description || "" });
    const formElement = document.querySelector('.task-form-section');
    if(formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleComplete = async (task) => {
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t._id === task._id ? { ...t, completed: !t.completed } : t));

    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    } catch (err) {
      console.error(err);
      setTasks(originalTasks);
      setError("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await api.delete(`/tasks/${id}`);
      setMessage(res.data.message || "Task deleted");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  // Helper to safely get owner name
  const getOwnerName = (taskUser) => {
    if (!taskUser) return "Unknown";
    // If backend populates the full object
    if (typeof taskUser === 'object') {
        return taskUser.name || taskUser.email || "User";
    }
    // If backend only sends the ID string
    return "User ID: " + taskUser.substring(0, 6) + "..."; 
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* --- HEADER SECTION --- */}
      <div className="dashboard-header-row">
        <div className="user-info-block">
          <h2>Dashboard</h2>
          <p className="user-details">
            Logged in as <span className="user-name">{user?.name}</span>
            <span className={`role-badge ${user?.role === 'admin' ? 'role-admin' : 'role-user'}`}>
              {user?.role}
            </span>
          </p>
        </div>
        <button onClick={onLogout} className="btn-logout-dashboard">
          Logout
        </button>
      </div>

      {/* Input Section */}
      <section className="task-form-section">
        <div className="section-header">
          <h3>{editingId ? "Edit Task" : "Add New Task"}</h3>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-row">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="task-input title-input"
              required
            />
          </div>
          <div className="form-row">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details (optional)..."
              rows={2}
              className="task-input desc-input"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Task" : "Add Task"}
            </button>
            
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        {(message || error) && (
          <div className={`status-banner ${error ? "error" : "success"}`}>
            {error || message}
          </div>
        )}
      </section>

      {/* List Section */}
      <section className="task-list-section">
        <h3 className="list-title">Your Tasks ({tasks.length})</h3>
        
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No tasks yet.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div 
                key={task._id} 
                className={`task-card ${task.completed ? "completed" : ""}`}
              >
                <div className="task-content">
                  <div className="task-header">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <span className="task-title">{task.title}</span>
                  </div>
                  
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  
                  {/* --- OWNER INFO (Admin Only) --- */}
                  <div className="task-meta">
                      {user?.role === 'admin' && (
                        <span className="meta-tag">
                          👤 Owner: {getOwnerName(task.user)}
                        </span>
                      )}
                  </div>
                  {/* ------------------------------- */}
                </div>

                <div className="task-actions">
                  <button 
                    onClick={() => handleEdit(task)} 
                    className="icon-btn edit-btn"
                    title="Edit Task"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)} 
                    className="icon-btn delete-btn"
                    title="Delete Task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TasksDashboard;