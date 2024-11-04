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
			{sup !== undefined && <sup>({sup})</sup>}
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

export const Description = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: calc(20 / 16);
	color: var(--500);
`;
