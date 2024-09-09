import { FC } from "react";
import styled, { css } from "styled-components";

interface TabProps {
	isActive: boolean;
	name: string;
	notification?: number;
	onClick: () => void;
}

const Notification = styled.div`
	padding: 0 5px;
	height: 16px;
	border-radius: 3px;
	font-size: 10px;
	font-weight: 500;
	line-height: 14px;
	color: var(--500);
	border: 1px solid var(--200);
	background-color: var(--100);
	transition: 250ms;
`;

const Text = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: var(--500);
	transition: 250ms;
`;

interface StyledTabProps {
	isActive: boolean;
}

const StyledTab = styled.button.withConfig({ shouldForwardProp: (prop) => !["isActive"].includes(prop) })<StyledTabProps>`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 12px 16px;
	border-radius: 5px;
	transition: 250ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			background-color: var(--100);

			${Text} {
				color: var(--600);
			}
		}
	}

	&:active {
		background-color: var(--200);

		${Text} {
			color: var(--700);
		}
	}

	${({ isActive }) =>
		isActive &&
		css`
			background-color: var(--100);

			${Text} {
				color: var(--800);
			}

			${Notification} {
				border-color: var(--300);
				color: var(--800);
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background-color: var(--200);

					${Text} {
						color: var(--600);
					}
				}
			}

			&:active {
				${Text} {
					color: var(--800);
				}
			}
		`}
`;

const Tab: FC<TabProps> = ({ isActive, name, notification, onClick }) => {
	return (
		<StyledTab onClick={onClick} isActive={isActive}>
			<Text>{name}</Text>
			{notification && <Notification>{notification}</Notification>}
		</StyledTab>
	);
};

export default Tab;
