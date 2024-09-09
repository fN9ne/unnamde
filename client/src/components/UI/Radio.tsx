import { FC } from "react";
import styled from "styled-components";

interface RadioProps {
	name: string;
	value: string;
	currentValue: string;
	disabled?: boolean;
	children?: React.ReactNode;
	onChange: (value: string) => void;
}

const RadioCustom = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 8px;
	border: 1px solid var(--300);
	transition: 250ms, outline-color 250ms 100ms;
	outline: 2px solid transparent;
	outline-offset: 1px;
	position: relative;

	&::before {
		content: "";
		width: 10px;
		height: 10px;
		border-radius: 6px;
		transition: 250ms;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		scale: 0;
		opacity: 0;
		visibility: hidden;
		background-color: var(--400);
	}
`;

const RadioText = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: var(--500);
	transition: 250ms;
`;

interface RadioContainerProps {
	disabled?: boolean;
	isChecked: boolean;
}

const RadioContainer = styled.label.withConfig({
	shouldForwardProp: (prop) => !["disabled", "isChecked"].includes(prop),
})<RadioContainerProps>`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;

	input {
		display: none;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			> ${RadioCustom} {
				border-color: var(--400);
			}
			> ${RadioText} {
				color: var(--600);
			}
		}
	}

	&:active {
		> ${RadioCustom} {
			outline-color: var(--200);

			&::before {
				opacity: 1;
				visibility: visible;
				scale: 0.5;
			}
		}
	}

	${({ disabled }) =>
		disabled &&
		`
		pointer-events: none;

		> ${RadioCustom} {
			border-color: var(--200);
		}
		> ${RadioText} {
			color: var(--200);
		}
	`}

	${({ isChecked, disabled }) =>
		isChecked &&
		`
		> ${RadioCustom} {
			border-color: var(--primary);
			
			&::before {
				background-color: var(--primary);
				scale: 1;
				opacity: 1;
				visibility: visible;
			}
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				> ${RadioCustom} {
					border-color: var(--primary-light);

					&::before {
						background-color: var(--primary-light);
					}
				}
			}

			&:active {
				> ${RadioCustom} {
					border-color: var(--primary-dark);
					outline-color: var(--primary-lighter);

					&::before {
						background-color: var(--primary-dark);
						scale: 1;
					}
				}
				> ${RadioText} {
					color: var(--900);
				}
			}
		}

		${
			disabled &&
			`
			> ${RadioCustom} {
				border-color: var(--primary-lighter);

				&::before {
					background-color: var(--primary-lighter);
				}
			}
		`
		};
	`}
`;
const Radio: FC<RadioProps> = ({ name, value, currentValue, disabled, children, onChange }) => {
	const isChecked = value === currentValue;

	return (
		<RadioContainer isChecked={isChecked} disabled={disabled}>
			<input type="radio" onChange={() => onChange(value)} name={name} value={value} checked={isChecked} />
			<RadioCustom />
			{children && <RadioText>{children}</RadioText>}
		</RadioContainer>
	);
};

export default Radio;
