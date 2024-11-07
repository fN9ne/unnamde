import { FC, useState } from "react";
import styled, { css } from "styled-components";
import { setTextAndIconColor } from "@/functions";
import { AnimatePresence as AP, motion as m } from "framer-motion";

/* my components */

import Flex from "./Flex";

/* svg */

import ChevronDownIcon from "@icons/chevronDown.svg?react";

/* main */

interface YearContainerProps {
	year: number | string;
	children: React.ReactNode;
}

const YearContainer: FC<YearContainerProps> = ({ year, children }) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<Flex column gap={24}>
			<Title gap={8} isVisible={isVisible} onClick={() => setIsVisible((state) => !state)}>
				<span>{year}</span>
				<ChevronDownIcon />
			</Title>
			<AP mode="wait" initial={false}>
				{isVisible && (
					<m.div {...transitions}>
						<Flex column gap={20}>
							{children}
						</Flex>
					</m.div>
				)}
			</AP>
		</Flex>
	);
};

export default YearContainer;

/* styled components */

interface TitleProps {
	isVisible: boolean;
}

const shouldForwardProp = (prop: string) => !["isVisible"].includes(prop);

const Title = styled(Flex).attrs({ as: "button" }).withConfig({ shouldForwardProp })<TitleProps>`
	align-self: start;
	background-color: transparent;
	font-weight: 700;
	font-size: 24px;
	transition: 200ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			opacity: 0.7;
		}
	}
	
	svg {
		transition: 200ms;
	}
	
	${(props) =>
		props.isVisible &&
		css`
			svg {
				rotate: 180deg;
			}
		`}
	
	${setTextAndIconColor("var(--700)")};
`;
