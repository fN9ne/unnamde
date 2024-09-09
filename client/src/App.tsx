import { FC } from "react";
import { AnimatePresence as AP } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const App: FC = () => {
	const location = useLocation();

	return (
		<>
			<AP mode="wait" initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Navigate to="home" />} />
						<Route path="home" element={<Home />} />
					</Route>
				</Routes>
			</AP>
		</>
	);
};

export default App;
