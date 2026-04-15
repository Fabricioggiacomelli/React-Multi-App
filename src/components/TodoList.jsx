import { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React', done: true },
    { id: 2, text: 'Criar componentes', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('todas');

  function addTask() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
    setInput('');
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask();
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'pendentes') return !t.done;
    if (filter === 'concluidas') return t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="todo-container">
      <h2 className="todo-title">To-Do List</h2>

      <div className="todo-progress">
        <span>{doneCount} de {tasks.length} concluídas</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: tasks.length ? `${(doneCount / tasks.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      <div className="todo-input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="Nova tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="todo-add-btn" onClick={addTask}>
          Adicionar
        </button>
      </div>

      <div className="todo-filters">
        {['todas', 'pendentes', 'concluidas'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filtered.length === 0 && (
          <li className="todo-empty">Nenhuma tarefa aqui.</li>
        )}
        {filtered.map((task) => (
          <li key={task.id} className={`todo-item ${task.done ? 'done' : ''}`}>
            <button
              className="check-btn"
              onClick={() => toggleTask(task.id)}
              aria-label={task.done ? 'Desmarcar' : 'Concluir'}
            >
              {task.done ? '✓' : ''}
            </button>
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="Excluir tarefa"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
