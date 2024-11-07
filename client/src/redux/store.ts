import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modalSlice from "./slices/modal";
import projectsSlice from "./slices/projects";
import { api } from "@/services/api";

const rootReducer = combineReducers({
	modal: modalSlice.reducer,
	projects: projectsSlice.reducer,
	[api.reducerPath]: api.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
