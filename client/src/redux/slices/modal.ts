import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
	createProject: boolean;
	removeProject: boolean;
}

const initialState: ModalState = {
	createProject: false,
	removeProject: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<keyof typeof initialState>) {
			state[action.payload] = true;
		},
		closeModal(state, action: PayloadAction<keyof typeof initialState>) {
			state[action.payload] = false;
		},
	},
});

export default modalSlice;
