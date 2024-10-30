import React, { FC, forwardRef, useState } from "react";

import CheckIcon from "@icons/check.svg?react";
import WarningIcon from "@icons/warning.svg?react";
import VisibilityIcon from "@icons/visibility.svg?react";
import VisibilityOffIcon from "@icons/visibility_off.svg?react";
import CaretsIcon from "@icons/carets.svg?react";
import styled from "styled-components";
import Flex from "../Flex";

const StyledInput = styled.input.withConfig({ shouldForwardProp: (prop) => !["icon"].includes(prop) })<StyledInputProps>`
	height: 40px;
	width: inherit;
	border: 1px solid var(--200);
	border-radius: 5px;
	font-weight: 500;
	color: var(--800);
	padding: 0 ${({ icon }) => (icon ? "32px" : "10px")};
	transition: 250ms;
	caret-color: var(--primary);
	outline: 2px solid transparent;
	outline-offset: 1px;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		appearance: none;
		margin: 0;
	}

	&::placeholder {
		color: var(--400);
	}
`;

const InputIcon = styled.div`
	width: 14px;
	height: 14px;
	position: absolute;
	left: 11px;
	top: 50%;
	translate: 0 -50%;
	display: flex;
	align-items: center;

	svg path {
		fill: var(--300);
		transition: 250ms;
	}
`;

interface InputProps {
	type?: "text" | "password" | "number";
	value: string;
	placeholder?: string;
	disabled?: boolean;
	isValid?: boolean;
	isDirty?: boolean;
	isShowPassword?: boolean;
	min?: number;
	max?: number;
	step?: number;
	icon?: FC;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange: (value: string) => void;
}

interface InputWrapperProps {
	disabled?: boolean;
	valid?: boolean;
	focus: boolean;
	filled: boolean;
}

const InputWrapper = styled.div.withConfig({
	shouldForwardProp: (prop) => !["focus", "filled", "valid"].includes(prop),
})<InputWrapperProps>`
	position: relative;
	width: 240px;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			> ${StyledInput} {
				border-color: var(--400);
			}
			> ${InputIcon} {
				svg path {
					fill: var(--400);
				}
			}
		}
	}

	${({ focus }) =>
		focus &&
		`
			> ${StyledInput} {
				border-color: var(--primary);
				outline-color: var(--primary-lighter);
			}
			> ${InputIcon} {
				svg path {
					fill: var(--400);
				}
			}
			
			@media (hover: hover) and (pointer: fine) {
				&:hover {
					> ${StyledInput} {
						border-color: var(--primary-dark);
						outline-color: var(--primary-light);
					}
				}
			}
	`}

	${({ filled }) =>
		filled &&
		`
		> ${InputIcon} {
			svg path {
				fill: var(--600);
			}
		}
		
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				> ${InputIcon} {
					svg path {
						fill: var(--700);
					}
				}
			}
		}
	`}

	${({ valid, focus }) =>
		valid !== undefined &&
		(valid
			? `
			> ${InputIcon} {
				svg path {
					fill: var(--correct-light);
				}
			}

			> ${StyledInput} {
				border-color: var(--correct);
				caret-color: var(--correct);
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					> ${InputIcon} {
						svg path {
							fill: var(--correct);
						}
					}
					> ${StyledInput} {
						border-color: var(--correct-dark);
					}
				}
			}

			${
				focus &&
				`
				> ${InputIcon} {
					svg path {
						fill: var(--correct);
					}
				}
				> ${StyledInput} {
					outline-color: var(--correct-lighter);
				}
				@media (hover: hover) and (pointer: fine) {
					&:hover {
						> ${StyledInput} {
							outline-color: var(--correct-light);
						}
					}
				}
			`
			}
		`
			: `
			> ${InputIcon} {
				svg path {
					fill: var(--error-light);
				}
			}
			> ${StyledInput} {
				border-color: var(--error);
				caret-color: var(--error);
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					> ${InputIcon} {
						svg path {
							fill: var(--error);
						}
					}
					> ${StyledInput} {
						border-color: var(--error-dark);
					}
				}
			}

			${
				focus &&
				`
				> ${InputIcon} {
					svg path {
						fill: var(--error);
					}
				}
				> ${StyledInput} {
					outline-color: var(--error-lighter);
				}
				@media (hover: hover) and (pointer: fine) {
					&:hover {
						> ${StyledInput} {
							outline-color: var(--error-light);
						}
					}
				}
			`
			}
		`)}

	${({ disabled }) =>
		disabled &&
		`
			pointer-events: none;

			> ${StyledInput} {
				border-color: var(--100);
				color: var(--400);
				&::placeholder {
					color: var(--200);
				}
			}
			> ${InputIcon} {
				svg:not(.stroke) path {
					fill: var(--200);
				}
				svg.stroke path {
					stokre: var(--200);
				}
			}
	`}
`;

interface StyledInputProps {
	icon: boolean;
}

const SideIcons = styled(Flex)`
	position: absolute;
	right: 11px;
	top: 50%;
	translate: 0 -50%;

	svg {
		width: 14px;
		height: 14px;
	}
`;

const ToggleVisibility = styled.button`
	width: 14px;
	height: 14px;
	background-color: transparent;
	display: flex;
	align-items: center;

	svg path {
		fill: var(--300);
		transition: 250ms;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			svg path {
				fill: var(--500);
			}
		}
	}
`;

interface StatusIconProps {
	isValid: boolean;
}

const StatusIcon = styled.div.withConfig({ shouldForwardProp: (prop) => !["isValid"].includes(prop) })<StatusIconProps>`
	display: flex;
	align-items: center;

	${({ isValid }) =>
		isValid
			? `
		svg:not(.stroke) path {
			fill: var(--correct);
		}
		svg.stroke path {
			stroke: var(--correct);
		}
	`
			: `
		svg:not(.stroke) path {
			fill: var(--error);
		}
		svg.stroke path {
			stroke: var(--error);
		}
	`}
`;

const CaretsContainer = styled.div`
	width: 14px;
	height: 14px;
	display: flex;
	align-items: center;

	svg path {
		fill: var(--600);
	}
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ type, value, placeholder, disabled, isValid, isDirty, isShowPassword, icon, min, max, step, onFocus, onBlur, onChange },
		ref
	) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
		const [isFocused, setIsFocused] = useState<boolean>(false);
		const isFilled = value.length > 0;

		const getInputType = (isShowPassword?: boolean, type?: string): string => {
			return isShowPassword ? (isPasswordVisible ? "text" : "password") : type || "text";
		};

		return (
			<InputWrapper disabled={disabled} valid={isDirty ? isValid : undefined} focus={isFocused} filled={isFilled}>
				{icon && <InputIcon>{React.createElement(icon)}</InputIcon>}
				<StyledInput
					ref={ref}
					icon={icon !== undefined}
					type={getInputType(isShowPassword, type)}
					placeholder={placeholder}
					value={value}
					onFocus={() => {
						if (onFocus) onFocus();
						setIsFocused(true);
					}}
					onBlur={() => {
						if (onBlur) onBlur();
						setIsFocused(false);
					}}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					onChange={(event) => {
						onChange(event.target.value);
					}}
				/>
				<SideIcons gap={8} alignItems="center">
					{isShowPassword && (
						<ToggleVisibility onClick={() => setIsPasswordVisible((state) => !state)}>
							{isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
						</ToggleVisibility>
					)}
					{isValid !== undefined && isDirty && (
						<StatusIcon isValid={isValid}>{isValid ? <CheckIcon /> : <WarningIcon />}</StatusIcon>
					)}
					{type === "number" && (
						<CaretsContainer>
							<CaretsIcon />
						</CaretsContainer>
					)}
				</SideIcons>
			</InputWrapper>
		);
	}
);

export default Input;
