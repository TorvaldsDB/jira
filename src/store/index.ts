import { projectListSlice } from "./../screens/ProjectList/project-list.slice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = {
  projectList: projectListSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
