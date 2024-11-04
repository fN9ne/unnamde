import modalSlice from "./slices/modal";
import projectsSlice from "./slices/projects";

export default {
	...modalSlice.actions,
	...projectsSlice.actions,
};
