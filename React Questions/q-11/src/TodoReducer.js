export const initialState = {
    todos: [],
  };
  
export function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
        return {
            todos: [...state.todos, action.payload],
        };
        case 'TOGGLE_TODO':
        return {
            todos: state.todos.map(todo =>
            todo.id === action.payload
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
        };
        case 'DELETE_TODO':
        return {
            todos: state.todos.filter(todo => todo.id !== action.payload),
        };
        default:
        return state;
    }
}
  