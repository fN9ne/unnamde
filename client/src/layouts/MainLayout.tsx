import { FC } from "react";
import { motion as m } from "framer-motion";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

/* main */

const MainLayout: FC = () => {
	const transitions = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
		transition: { duration: 0.25 },
	};

	return (
		<StyledMain {...transitions}>
			<Outlet />
		</StyledMain>
	);
};

export default MainLayout;

/* styled components */

const StyledMain = styled(m.div)`
	flex: 1 1 auto;
	padding: 40px 60px;
`;
