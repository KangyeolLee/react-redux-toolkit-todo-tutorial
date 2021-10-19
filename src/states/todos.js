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
  },
});

export const { add } = todosSlice.actions;
export default todosSlice.reducer;
