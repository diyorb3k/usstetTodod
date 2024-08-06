import React, { useEffect } from 'react';
import useStore from './store';

const TodoApp = () => {
  const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = () => {
    const newTodo = { id: Date.now(), title: 'New Todo', completed: false };
    addTodo(newTodo);
    axios.post('http://localhost:3000/todos', newTodo);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
