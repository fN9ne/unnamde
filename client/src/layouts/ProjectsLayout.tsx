import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence as AP, motion as m } from "framer-motion";

/* components */

import ProjectsHeader from "../components/ProjectsHeader";

/* main */

const ProjectsLayout: FC = () => {
	const transitions = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
		transition: { duration: 0.25 },
	};

	const locaiton = useLocation();

	return (
		<>
			<ProjectsHeader />
			<AP mode="wait" initial={false}>
				<m.div key={locaiton.pathname.split("/")[2]} {...transitions}>
					<Outlet />
				</m.div>
			</AP>
		</>
	);
};

export default ProjectsLayout;
