import { FC, useEffect } from "react";
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
import { useActions } from "./hooks/useActions";
import ProjectPage from "./pages/ProjectPage";

/* main */

const App: FC = () => {
	const location = useLocation();

	const { setProjects } = useActions();

	useEffect(() => {
		setProjects([
			{
				id: 0,
				name: "Anidata",
				createdAt: new Date().toString(),
				description: "anidata description",
				finishedAt: null,
				image: "https://i.ytimg.com/vi/Afx0CNvU9h8/maxresdefault.jpg",
				lastModifiedAt: null,
				productionUrl: null,
				repositoryUrl: null,
				status: "in progress",
				version: "v1.0.0",
				tasks: [
					{
						id: 0,
						name: "Task 1",
						description: "Task 1 description",
						imageId: 1,
						tags: [],
						priority: "high",
						status: "done",
						createdAt: new Date().toString(),
						finishedAt: null,
						startedAt: null,
					},
					{
						id: 0,
						name: "Task 1",
						description: "Task 1 description",
						imageId: 1,
						tags: [],
						priority: "high",
						status: "in-progress",
						createdAt: new Date().toString(),
						finishedAt: null,
						startedAt: null,
					},
					{
						id: 0,
						name: "Task 1",
						description: "Task 1 description",
						imageId: 1,
						tags: [],
						priority: "high",
						status: "in-progress",
						createdAt: new Date().toString(),
						finishedAt: null,
						startedAt: null,
					},
					{
						id: 0,
						name: "Task 1",
						description: "Task 1 description",
						imageId: 1,
						tags: [],
						priority: "high",
						status: "in-progress",
						createdAt: new Date().toString(),
						finishedAt: null,
						startedAt: null,
					},
					{
						id: 0,
						name: "Task 1",
						description: "Task 1 description",
						imageId: 1,
						tags: [],
						priority: "high",
						status: "in-progress",
						createdAt: new Date().toString(),
						finishedAt: null,
						startedAt: null,
					},
				],
			},
			{
				id: 1,
				name: "Anisource",
				createdAt: new Date().toString(),
				description: "Anisource description",
				finishedAt: null,
				image: "https://i.ytimg.com/vi/Afx0CNvU9h8/maxresdefault.jpg",
				lastModifiedAt: null,
				productionUrl: null,
				repositoryUrl: null,
				status: "in progress",
				version: "v1.0.0",
				tasks: [],
			},
			{
				id: 2,
				name: "Aniplex",
				createdAt: new Date().toString(),
				description: "Aniplex description",
				finishedAt: null,
				image: "https://i.ytimg.com/vi/Afx0CNvU9h8/maxresdefault.jpg",
				lastModifiedAt: null,
				productionUrl: null,
				repositoryUrl: null,
				status: "in progress",
				version: "v1.0.0",
				tasks: [],
			},
			{
				id: 3,
				name: "Aniboom",
				createdAt: new Date().toString(),
				description: "Aniboom description",
				finishedAt: null,
				image: "https://i.ytimg.com/vi/Afx0CNvU9h8/maxresdefault.jpg",
				lastModifiedAt: null,
				productionUrl: null,
				repositoryUrl: null,
				status: "in progress",
				version: "v1.0.0",
				tasks: [],
			},
		]);
	}, []);

	return (
		<Flex>
			<Sidebar />
			<AP mode="wait" initial={false}>
				<Routes location={location} key={location.pathname.split("/")[1]}>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Navigate to={AppRoutes.AllProjects} />} />
						<Route path="projects" element={<Projects />} />
						<Route path=":projectName" element={<ProjectPage />} />
					</Route>
				</Routes>
			</AP>
		</Flex>
	);
};

export default App;
