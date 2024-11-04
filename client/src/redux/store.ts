import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modalSlice from "./slices/modal";
import projectsSlice from "./slices/projects";

const rootReducer = combineReducers({
	modal: modalSlice.reducer,
	projects: projectsSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
