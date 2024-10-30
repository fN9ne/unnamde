import { FC } from "react";
import styled from "styled-components";

/* my components */

import Flex from "./Flex";

/* title component */

interface TitleProps {
	sup?: string | number;
	children: React.ReactNode;
}

export const Title: FC<TitleProps> = ({ sup, children }) => {
	return (
		<StyledTitle gap={8}>
			<span>{children}</span>
			{sup && <sup>({sup})</sup>}
		</StyledTitle>
	);
};

const StyledTitle = styled(Flex)`
	font-size: 28px;
	font-weight: 800;
	color: var(--800);

	sup {
		font-size: 17px;
		color: var(--500);
	}
`;
