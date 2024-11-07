import { FC } from "react";
import { AnimatePresence as AP } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

/* my components */

import { AppRoutes } from "./routes";

/* layouts */

import MainLayout from "./layouts/MainLayout";

/* pages */

import Projects from "./pages/Projects";

/* components */

import Sidebar from "./components/Sidebar";
import Flex from "./components/Flex";
import ProjectPage from "./pages/ProjectPage";
import { useGetProjectsQuery } from "./services/api";
import Modals from "./components/Modal/Modals";

/* main */

const App: FC = () => {
	const location = useLocation();

	useGetProjectsQuery();

	return (
		<>
			<Flex>
				<Sidebar />
				<AP mode="wait" initial={false}>
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<Navigate to={AppRoutes.AllProjects} />} />
							<Route path="projects" element={<Projects />} />
							<Route path="projects/:projectId" element={<ProjectPage />} />
						</Route>
					</Routes>
				</AP>
			</Flex>
			<Modals />
		</>
	);
};

export default App;
