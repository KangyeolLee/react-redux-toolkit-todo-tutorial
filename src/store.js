import { configureStore } from "@reduxjs/toolkit";
import todos from "./states/todos";

export default configureStore({
  reducer: {
    todos,
  },
});
