import { FC } from "react";
import RemoveProjectModal from "./RemoveProjectModal";
import CreateProjectModal from "./CreateProjectModal";

const Modals: FC = () => {
	return (
		<>
			<RemoveProjectModal />
			<CreateProjectModal />
		</>
	);
};

export default Modals;
