import { SortType } from "@/components/ProjectsHeader";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
	id: number;
	imageId: number;
	name: string;
	description: string;
	priority: "low" | "medium" | "high";
	tags: ("design" | "backend" | "frontend" | "bug")[];
	createdAt: string;
	startedAt: string | null;
	finishedAt: string | null;
	status: "todo" | "in-progress" | "done";
}

export interface IProject {
	id: number;
	image: string;
	name: string;
	description: string;
	version: string;
	status: "done" | "in progress" | "abandoned";
	createdAt: string;
	lastModifiedAt: string | null;
	finishedAt: string | null;
	repositoryUrl: string | null;
	productionUrl: string | null;
	tasks: ITask[];
}

interface projectsState {
	projects: IProject[];
	sortType: SortType;
}

const initialState: projectsState = {
	projects: [],
	sortType: "New ones first",
};

const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		setProjects(state, action: PayloadAction<IProject[]>) {
			state.projects = action.payload;
		},
		setSortType(state, action: PayloadAction<SortType>) {
			state.sortType = action.payload;
		},
	},
});

export default projectsSlice;
