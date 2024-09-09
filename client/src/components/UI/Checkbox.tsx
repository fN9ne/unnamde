import { FC } from "react";
import styled from "styled-components";

import CheckIcon from "@icons/check.svg?react";

interface CheckboxProps {
	value: string;
	state: string[];
	disabled?: boolean;
	children?: React.ReactNode;
	onChange: (value: string[]) => void;
}

/* style */

const CheckboxCustom = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 5px;
	border: 1px solid var(--300);
	outline: 2px solid transparent;
	outline-offset: 1px;
	transition: 250ms, outline-color 250ms 100ms;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: inherit;
		height: inherit;

		path {
			stroke: var(--0);
			stroke-dasharray: 15;
			stroke-dashoffset: 15;
			transition: 250ms;
		}
	}
`;

const CheckboxText = styled.div`
	user-select: none;
	font-weight: 500;
	color: var(--500);
	font-size: 16px;
	transition: 250ms;
`;

interface StyledCheckboxProps {
	isChecked: boolean;
	disabled: boolean;
}

const StyledCheckbox = styled.label.withConfig({
	shouldForwardProp: (prop: string) => !["isChecked"].includes(prop),
})<StyledCheckboxProps>`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;

	input {
		display: none;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			> ${CheckboxCustom} {
				border-color: var(--400);
			}
			> ${CheckboxText} {
				color: var(--600);
			}
		}
	}

	&:active {
		> ${CheckboxCustom} {
			outline-color: var(--200);
			background-color: var(--400);

			svg path {
				stroke-dashoffset: 7.5;
			}
		}
	}

	${({ disabled }) =>
		disabled &&
		`
		pointer-events: none;

		> ${CheckboxCustom} {
			border-color: var(--200);
		}
		> ${CheckboxText} {
			color: var(--200);
		}
	`};

	${({ isChecked, disabled }) =>
		isChecked &&
		`
		> ${CheckboxCustom} {
			border-color: var(--primary);
			background-color: var(--primary);

			svg path {
				stroke-dashoffset: 0;
			}
		}
		> ${CheckboxText} {
			color: var(--700);
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				> ${CheckboxCustom} {
					background-color: var(--primary-light);
					border-color: var(--primary-light);
				}
				> ${CheckboxText} {
					color: var(--600);
				}
			}
		}

		&:active {
			> ${CheckboxCustom} {
				background-color: var(--primary-dark);
				border-color: var(--primary-dark);
				outline-color: var(--primary-lighter);
			}
		}

		${
			disabled &&
			`
				> ${CheckboxCustom} {
					border-color: var(--primary-lighter);
					background-color: var(--primary-lighter);
				}
				> ${CheckboxText} {
					color: var(--200);
				}
			`
		}
	`};
`;

/* main */

const Checkbox: FC<CheckboxProps> = (props) => {
	const { value, state, children, disabled, onChange } = props;

	const isChecked = state.includes(value);

	const handleChange = (): void => onChange(isChecked ? state.filter((item) => item !== value) : [...state, value]);

	return (
		<StyledCheckbox isChecked={isChecked} disabled={disabled || false}>
			<input type="checkbox" onChange={handleChange} value={value} checked={isChecked} />
			<CheckboxCustom>
				<CheckIcon />
			</CheckboxCustom>
			{children && <CheckboxText>{children}</CheckboxText>}
		</StyledCheckbox>
	);
};

export default Checkbox;
