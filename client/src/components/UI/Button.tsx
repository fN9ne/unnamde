import React, { FC } from "react";
import styled, { css, keyframes } from "styled-components";
import { AnimatePresence as AP, motion as m } from "framer-motion";

interface ButtonProps {
	small?: boolean;
	fit?: boolean;
	loading?: boolean;
	onlyIcon?: boolean;
	disabled?: boolean;
	type?: "button" | "reset" | "submit";
	style?: "primary" | "bordered" | "transparent" | "correct" | "error";
	icon?: FC;
	children?: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonStyle = {
	primary: css`
		background: var(--primary);
		color: var(--0);
		svg path {
			fill: var(--0);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--primary-dark);
			}
		}
		&:active {
			background: var(--primary-darker);
		}
		&:disabled {
			background: var(--400);
			color: var(--200);
			svg path {
				fill: var(--200);
			}
		}
	`,
	bordered: css`
		background: transparent;
		border-color: var(--300);
		color: var(--600);
		svg path {
			fill: var(--600);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				border-color: var(--500);
			}
		}
		&:active {
			border-color: transparent;
			background: var(--200);
		}
		&:disabled {
			border-color: var(--100);
			color: var(--200);
			svg path {
				fill: var(--200);
			}
		}
	`,
	transparent: css`
		background: transparent;
		color: var(--600);
		border-color: transparent;
		svg path {
			fill: var(--600);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--100);
			}
		}
		&:active {
			background: var(--200);
		}
		&:disabled {
			color: var(--200);
			svg path {
				fill: var(--200);
			}
		}
	`,
	correct: css`
		background: var(--correct);
		color: var(--0);
		svg path {
			fill: var(--0);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--correct-dark);
			}
		}
		&:active {
			background: var(--correct-darker);
		}
		&:disabled {
			background: var(--correct-lighter);
			color: var(--100);
			svg path {
				fill: var(--100);
			}
		}
	`,
	error: css`
		background: var(--error);
		color: var(--0);
		svg path {
			fill: var(--0);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--error-dark);
			}
		}
		&:active {
			background: var(--error-darker);
		}
		&:disabled {
			background: var(--error-lighter);
			color: var(--100);
			svg path {
				fill: var(--100);
			}
		}
	`,
};

const buttonLoadingStyle = {
	primary: css`
		background: var(--primary-light);
	`,
	bordered: css`
		border-color: var(--200);
		color: var(--400);
		svg path {
			fill: var(--400);
		}
	`,
	transparent: css`
		color: var(--400);
		svg path {
			fill: var(--400);
		}
	`,
	correct: css`
		background: var(--correct-light);
	`,
	error: css`
		background: var(--error-light);
	`,
};

const getWidth = (onlyIcon?: boolean, small?: boolean, fit?: boolean): string => {
	if (onlyIcon) return small ? "34px" : "40px";
	if (fit) return "auto";
	return small ? "160px" : "200px";
};

const getPadding = (onlyIcon?: boolean, small?: boolean): string => {
	return onlyIcon ? "0" : small ? "15px" : "19px";
};

const getHeight = (small?: boolean): string => {
	return small ? "34px" : "40px";
};

const shouldForwardProp = (prop: string) => !["small", "fit", "onlyIcon", "style", "loading", "icon"].includes(prop);

const StyledButton = styled.button.withConfig({ shouldForwardProp })<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${({ small }) => (small ? "4px" : "6px")};
	width: ${({ onlyIcon, small, fit }) => getWidth(onlyIcon, small, fit)};
	height: ${({ small }) => getHeight(small)};
	padding: 0 ${({ onlyIcon, small }) => getPadding(onlyIcon, small)};
	border: 1px solid;
	${({ small }) => small && "font-size: 12px"};
	font-weight: 500;
	border-radius: 5px;
	${({ loading }) => loading && "pointer-events: none"};
	user-select: none;
	transition: 250ms;

	${({ style }) => buttonStyle[style || "primary"]};
	${({ style, loading }) => loading && buttonLoadingStyle[style || "primary"]};

	&:disabled {
		pointer-events: none;
	}
`;

const buttonLoader = keyframes`
	to {
		rotate: 360deg;
	}
`;

const ButtonLoader = styled(m.div).withConfig({ shouldForwardProp: (prop: string) => !["onlyIcon", "small"].includes(prop) })<
	Pick<ButtonProps, "onlyIcon" | "small">
>`
	width: ${({ onlyIcon, small }) => getIconSize(onlyIcon, small)};
	height: ${({ onlyIcon, small }) => getIconSize(onlyIcon, small)};
	position: relative;

	&::before {
		content: "";
		width: 80%;
		height: 80%;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		position: absolute;
		border: 2px solid;
		border-radius: 50%;
		border-left-color: transparent;
		animation: ${buttonLoader} 1s linear infinite;
	}
`;

const getIconSize = (onlyIcon?: boolean, small?: boolean) => {
	if (onlyIcon) return small ? "16px" : "20px";
	return small ? "12px" : "14px";
};

const IconContainer = styled(m.div).withConfig({ shouldForwardProp: (prop: string) => !["onlyIcon", "small"].includes(prop) })<
	Pick<ButtonProps, "onlyIcon" | "small">
>`
	display: flex;
	align-items: center;
	width: ${({ onlyIcon, small }) => getIconSize(onlyIcon, small)};
	height: ${({ onlyIcon, small }) => getIconSize(onlyIcon, small)};

	svg {
		width: inherit;
		height: inherit;
	}
`;

const Button: FC<ButtonProps> = (props) => {
	if (props.children && props.onlyIcon) {
		throw new Error(`The propses "onlyIcon" and "children" can not be used together`);
	}

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<StyledButton {...props}>
			<AP mode="wait" initial={false}>
				{props.loading && <ButtonLoader onlyIcon={props.onlyIcon} small={props.small} key="icon" {...transitions} />}
				{props.icon && !props.loading && (
					<IconContainer key="loader" {...transitions} onlyIcon={props.onlyIcon} small={props.small}>
						{React.createElement(props.icon)}
					</IconContainer>
				)}
			</AP>
			{props.children && <span>{props.children}</span>}
		</StyledButton>
	);
};

export default Button;
