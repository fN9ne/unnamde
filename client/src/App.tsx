import { FC } from "react";
import { AnimatePresence as AP } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

/* my components */

import { AppRoutes } from "./routes";

/* layouts */

import MainLayout from "./layouts/MainLayout";
import ProjectsLayout from "./layouts/ProjectsLayout";

/* pages */

import Projects from "./pages/Projects";

/* components */

import Sidebar from "./components/Sidebar";
import Flex from "./components/Flex";

/* main */

const App: FC = () => {
	const location = useLocation();

	return (
		<Flex>
			<Sidebar />
			<AP mode="wait" initial={false}>
				<Routes location={location} key={location.pathname.split("/")[1]}>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Navigate to={AppRoutes.AllProjects} />} />
						<Route path="projects" element={<ProjectsLayout />}>
							<Route path="main" element={<Projects />} />
						</Route>
					</Route>
				</Routes>
			</AP>
		</Flex>
	);
};

export default App;
