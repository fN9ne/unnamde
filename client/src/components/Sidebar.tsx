import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

/* my components */

import { setTextAndIconColor } from "@/functions";
import { AppRoutes } from "@/routes";

/* components */

import Flex from "./Flex";

/* svg */

import Logo from "@/assets/logo.svg?react";

import AppsIcon from "@icons/apps.svg?react";
import ProjectsIcon from "@icons/projects.svg?react";
import ClickIcon from "@icons/click.svg?react";
import ActivityIcon from "@icons/activity.svg?react";
import EyeIcon from "@icons/visibility.svg?react";

/* main */

const Sidebar: FC = () => {
	const mainLinks: ICategoryItem[] = [
		{
			to: AppRoutes.AllProjects,
			icon: ProjectsIcon,
			name: "Projects",
		},
		{
			to: AppRoutes.ClickTracker,
			icon: ClickIcon,
			name: "Click tracker",
		},
		{
			to: AppRoutes.ActivityTracker,
			icon: ActivityIcon,
			name: "Activity tracker",
		},
		{
			to: AppRoutes.ViewDatabase,
			icon: EyeIcon,
			name: "View database",
		},
	];

	return (
		<Flex padding={40} gap={40} column>
			<Link to={AppRoutes.AllProjects}>
				<Logo />
			</Link>
			{/* navbar */}
			<Flex gap={32} column>
				{/* main */}
				<Flex gap={12} column>
					<CategoryTitle>
						<AppsIcon />
						<span>Main</span>
					</CategoryTitle>
					<Flex gap={4} column>
						{mainLinks.map((link, index) => (
							<CategoryItem key={index} {...link} />
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Sidebar;

/* title of category */

const CategoryTitle = styled(Flex)`
	font-weight: 600;
	${setTextAndIconColor("var(--500)")}
`;
CategoryTitle.defaultProps = {
	gap: 8,
};

/* category item */

interface ICategoryItem {
	to: AppRoutes | string;
	icon: FC;
	name: string;
}

const CategoryItem: FC<ICategoryItem> = ({ to, icon, name }) => {
	return (
		<StyledCategoryItem to={to}>
			{React.createElement(icon)}
			<span>{name}</span>
		</StyledCategoryItem>
	);
};

const StyledCategoryItem = styled(NavLink)`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 200px;
	height: 40px;
	padding: 8px 12px;
	border-radius: 5px;
	font-weight: 500;
	${setTextAndIconColor("var(--300)")}
	transition: 200ms;

	&.active {
		background-color: var(--100);
		${setTextAndIconColor("var(--800)")}
	}

	@media (hover: hover) and (pointer: fine) {
		&:not(.active):hover {
			${setTextAndIconColor("var(--500)")}
		}
	}
`;
