import { FC } from "react";
import styled, { css } from "styled-components";

interface SwitchStatedText {
	off: string;
	on: string;
}

interface SwitchProps {
	type?: "normal" | "rg";
	isChecked: boolean;
	disabled?: boolean;
	text?: string | SwitchStatedText;
	onChange: (value: boolean) => void;
}

interface SwitchContainerProps {
	isChecked: boolean;
	type?: SwitchProps["type"];
	disabled?: boolean;
}

const Origin = styled.div`
	width: 40px;
	height: 20px;
	border-radius: 10px;
	background-color: var(--200);
	transition: 250ms, outline-color 250ms 100ms;
	position: relative;
	outline: 2px solid transparent;
	outline-offset: 1px;
`;

const Bundle = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 8px;
	background-color: var(--0);
	top: 2px;
	left: 2px;
	position: absolute;
	transition: 400ms;
`;

const SwitchText = styled.div`
	font-size: 16px;
	font-weight: 500;
	color: var(--600);
`;

const SwitchContainer = styled.label.withConfig({
	shouldForwardProp: (prop) => !["type", "isChecked"].includes(prop),
})<SwitchContainerProps>`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;

	input {
		display: none;
	}

	user-select: none;

	${({ type }) => type && switchStyles[type]}

	&:active {
		${Bundle} {
			left: 6px;
		}
	}

	${({ isChecked, type }) =>
		isChecked &&
		`
			${Bundle} {
				left: 22px;
			}

			&:active {
				${Bundle} {
					left: 18px;
				}
			}

			> ${SwitchText} {
				color: var(--800);
			}

			${
				type === "normal"
					? `
				${Origin} {
					background-color: var(--primary);
				}

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						${Origin} {
							background-color: var(--primary-dark);
						}
					}
				}

				&:active {
					${Origin} {
						outline-color: var(--primary-lighter);
					}
				}
			`
					: `
				${Origin} {
					background-color: var(--correct);
				}

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						${Origin} {
							background-color: var(--correct-dark);
						}
					}
				}

				&:active {
					${Origin} {
						outline-color: var(--correct-lighter);
					}
				}
			`
			}
		`}
`;

const switchStyles = {
	normal: css`
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				> ${Origin} {
					background-color: var(--300);
				}

				> ${SwitchText} {
					color: var(--700);
				}
			}
		}

		&:active {
			> ${Origin} {
				outline-color: var(--100);
			}

			${Bundle} {
				left: 6px;
			}
		}
	`,
	rg: css`
		> ${Origin} {
			background-color: var(--error);
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				> ${Origin} {
					background-color: var(--error-dark);
				}

				> ${SwitchText} {
					color: var(--700);
				}
			}
		}

		&:active {
			> ${Origin} {
				outline-color: var(--error-lighter);
			}
		}
	`,
};

const Switch: FC<SwitchProps> = ({ isChecked, type, disabled, text, onChange }) => {
	const renderText = (text: SwitchProps["text"]): string => {
		return typeof text === "string" ? text : typeof text === "object" ? (isChecked ? text.on : text.off) : "";
	};

	return (
		<SwitchContainer isChecked={isChecked} type={type || "normal"} disabled={disabled}>
			<input type="checkbox" onChange={() => onChange(!isChecked)} checked={isChecked} />
			<Origin>
				<Bundle />
			</Origin>
			{renderText(text) !== "" && <SwitchText>{renderText(text)}</SwitchText>}
		</SwitchContainer>
	);
};

export default Switch;
