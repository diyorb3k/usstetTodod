import create from 'zustand';
import axios from 'axios';

const useStore = create(set => ({
  todos: [],
  fetchTodos: async () => {
    const response = await axios.get('http://localhost:3000/todos');
    set({ todos: response.data });
  },
  addTodo: (todo) => set(state => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id) => set(state => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  deleteTodo: (id) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}));

export default useStore;
