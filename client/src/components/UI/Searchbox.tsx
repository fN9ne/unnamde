import { useInput } from "@/hooks/useInput";
import { FC, useEffect, useRef, useState } from "react";

/* my components */

import Input from "./Input";

/* svg */

import SearchIcon from "@icons/search.svg?react";

/* main */

const Searchbox: FC = () => {
	const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const query = useInput("", {});
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "s") {
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
		if (isInputFocused && query.value.length > 0) {
			setIsDropdownActive(true);
		}
	}, [isInputFocused, query.value]);

	return (
		<div ref={dropdownRef}>
			<Input
				icon={SearchIcon}
				value={query.value}
				onBlur={() => setIsInputFocused(false)}
				onFocus={() => setIsInputFocused(true)}
				onChange={query.onChange}
				placeholder=" Search project..."
				ref={inputRef}
			/>
			{isDropdownActive && <div>asd</div>}
		</div>
	);
};

export default Searchbox;
