import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modalSlice from "./slices/modal";

const rootReducer = combineReducers({
	modal: modalSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
