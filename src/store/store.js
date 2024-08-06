import create from 'zustand';
import axios from 'axios';

const useStore = create(set => ({
  todos: [],
  fetchTodos: async () => {
    const response = await axios.get('http://localhost:3000/todos');
    set({ todos: response.data });
  },
  addTodo: (todo) => set(state => ({ todos: [...state.todos, todo] })),
  updateTodo: (updatedTodo) => set(state => ({
    todos: state.todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    )
  })),
  deleteTodo: (id) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}));

export default useStore;
