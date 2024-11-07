import { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import styled from "styled-components";

/* my components */

import Input from "./Input";
import Flex from "../Flex";

/* svg */

import SearchIcon from "@icons/search.svg?react";
import CommandIcon from "@icons/command.svg?react";
import { setTextAndIconColor } from "@/functions";

/* main */

interface SearchboxProps {
	query: string;
	onChange: (value: string) => void;
	children: React.ReactNode;
}

const Searchbox: FC<SearchboxProps> = ({ query, onChange, children }) => {
	const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.ctrlKey && (event.key === "s" || event.key === "ы")) {
				event.preventDefault();

				if (inputRef.current) inputRef.current.focus();
			}
		};

		const handleCloseDropdown = (event: MouseEvent) => {
			const target = event.target as Node;

			if (dropdownRef.current && !dropdownRef.current.contains(target)) {
				setIsDropdownActive(false);
			}
		};

		document.addEventListener("click", handleCloseDropdown);
		document.addEventListener("keydown", handleKeyUp);

		return () => {
			document.removeEventListener("click", handleCloseDropdown);
			document.removeEventListener("keydown", handleKeyUp);
		};
	}, []);

	useEffect(() => {
		if (isInputFocused) {
			setIsDropdownActive(query.length > 0);
		}
	}, [isInputFocused, query]);

	const transitions = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	};

	return (
		<StyledSearchbox ref={dropdownRef}>
			<InputWrapper>
				<Input
					icon={SearchIcon}
					value={query}
					onBlur={() => setIsInputFocused(false)}
					onFocus={() => setIsInputFocused(true)}
					onChange={onChange}
					placeholder=" Search project..."
					ref={inputRef}
				/>
				<Hint padding={[0, 6]} gap={3} alignItems="center">
					<CommandIcon />
					<span>S</span>
				</Hint>
			</InputWrapper>
			<AP mode="wait" initial={false}>
				{isDropdownActive && (
					<m.div {...transitions}>
						<StyledDropdown>
							<DropdownTrack column gap={2}>
								{children}
							</DropdownTrack>
						</StyledDropdown>
					</m.div>
				)}
			</AP>
		</StyledSearchbox>
	);
};

export default Searchbox;

/* styled components */

const InputWrapper = styled.div`
	position: relative;
`;

const StyledSearchbox = styled.div`
	position: relative;
`;

const StyledDropdown = styled(Flex)`
	z-index: 0;
	position: absolute;
	width: 100%;
	min-height: 36px;
	left: 0;
	top: calc(100% + 10px);
	padding: 2px;
	border: 1px solid var(--primary);
	border-radius: 5px;
	outline: 2px solid var(--primary-lighter);
	outline-offset: 1px;
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

const Hint = styled(Flex)`
	position: absolute;
	right: 10px;
	top: 50%;
	translate: 0 -50%;
	background-color: var(--100);
	${setTextAndIconColor("var(--600)")};
	border-radius: 3px;
	font-weight: 500;
	height: 20px;
	box-shadow: 0 1px 0 var(--300);
`;
