import { FC } from "react";
import { motion as m } from "framer-motion";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Flex from "@/components/Flex";

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
			<StyledMainContent>
				<Outlet />
			</StyledMainContent>
		</StyledMain>
	);
};

export default MainLayout;

/* styled components */

const StyledMainContent = styled(Flex)`
	padding: 40px 60px;
	min-height: 100%;
`;

const StyledMain = styled(m.div)`
	flex: 1 1 auto;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 8px;
		background-color: var(--100);

		&-thumb {
			background-color: var(--300);

			&:hover {
				background-color: var(--200);
			}

			&:active {
				background-color: var(--400);
			}
		}
	}
`;
