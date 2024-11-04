import React, { FC, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence as AP, motion as m } from "framer-motion";

/* my components */

import Flex from "../Flex";

/* svg */

import ChevronDownIcon from "@icons/chevronDown.svg?react";
import { setTextAndIconColor } from "@/functions";
import { SortType } from "../ProjectsHeader";

/* main */

interface SelectProps {
	icon: FC;
	placeholder: string;
	onPick: (value: SortType) => void;
	values: string[];
}

const Select: FC<SelectProps> = ({ icon, onPick, placeholder, values }) => {
	const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

	const selectRef = useRef<HTMLDivElement>(null);

	const handlePick = (value: SortType) => {
		onPick(value);
		setIsDropdownActive(false);
	};

	useEffect(() => {
		const closeDropdown = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsDropdownActive(false);
		};

		document.addEventListener("click", closeDropdown);

		return () => document.removeEventListener("click", closeDropdown);
	}, []);

	const transitions = {
		initial: { opacity: 0, y: -4 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -4 },
	};

	return (
		<SelectWrapper ref={selectRef}>
			<StyledSelect isFocus={isDropdownActive} onClick={() => setIsDropdownActive((state) => !state)} gap={20}>
				<Flex gap={8} alignItems="center">
					{React.createElement(icon)}
					<span>{placeholder}</span>
				</Flex>
				<ChevronDownIcon />
			</StyledSelect>
			<AP mode="wait" initial={false}>
				{isDropdownActive && (
					<Dropdown {...transitions}>
						<DropdownTrack column gap={2}>
							{values.map((item, index) => (
								<DropdownItem key={index} onClick={() => handlePick(item as SortType)}>
									{item}
								</DropdownItem>
							))}
						</DropdownTrack>
					</Dropdown>
				)}
			</AP>
		</SelectWrapper>
	);
};

export default Select;

/* styled components */

interface StyledSelectProps {
	isFocus: boolean;
}

const shouldForwardProp = (prop: string) => !["isFocus"].includes(prop);

const StyledSelect = styled(Flex).withConfig({ shouldForwardProp })<StyledSelectProps>`
	height: 40px;
	padding: 0 11px;
	font-weight: 500;
	cursor: pointer;
	${setTextAndIconColor("var(--400)")};
	transition: 200ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${setTextAndIconColor("var(--500)")};
		}
	}

	> svg {
		transition: 200ms;
	}

	${(props) =>
		props.isFocus &&
		css`
			${setTextAndIconColor("var(--700)")};

			> svg {
				rotate: 180deg;
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					${setTextAndIconColor("var(--700)")};
				}
			}
		`}
`;

const SelectWrapper = styled.div`
	position: relative;
`;

const Dropdown = styled(m.div)`
	width: 180px;
	padding: 2px;
	border: 1px solid var(--primary);
	outline: 2px solid var(--primary-lighter);
	outline-offset: 1px;
	border-radius: 5px;
	position: absolute;
	top: calc(100% + 7px);
	left: 0;
`;

const DropdownTrack = styled(Flex)`
	width: 100%;
	max-height: 94px;
	overflow: auto;
	padding: 0 8px 0 0;

	&::-webkit-scrollbar {
		width: 4px;
		border-radius: 2px;

		&-thumb {
			background-color: var(--100);

			&:hover {
				background-color: var(--200);
			}

			&:active {
				background-color: var(--200);
			}
		}
	}
`;

const DropdownItem = styled(Flex)`
	height: 30px;
	padding: 8px 10px;
	color: var(--500);
	transition: 200ms;
	cursor: pointer;

	&:hover {
		color: var(--800);
	}
`;
