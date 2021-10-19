import { createSlice } from "@reduxjs/toolkit";

let uniqeId = 0;

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    filterType: "all",
    items: [],
  },

  reducers: {
    add: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => {
        return {
          payload: {
            id: ++uniqeId,
            done: false,
            text,
          },
        };
      },
    },
    check: (state, action) => {
      const { id, checked } = action.payload;

      state.items = state.items.map((todo) =>
        todo.id === id ? { ...todo, done: checked } : todo
      );
    },
    edit: (state, action) => {
      const { id, text } = action.payload;

      state.items = state.items.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
    },
    filter: (state, action) => {
      state.filterType = action.payload;
    },
    remove: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter((todo) => todo.id !== id);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.done);
    },
    toggleAll: (state, action) => {
      const done = action.payload;

      state.items = state.items.map((todo) => ({ ...todo, done }));
    },
  },
});

export const { add, check, edit, remove, filter, clearCompleted, toggleAll } =
  todosSlice.actions;
export default todosSlice.reducer;
