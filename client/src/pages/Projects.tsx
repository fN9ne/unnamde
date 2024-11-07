import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, useEffect, useState } from "react";

/* my components */

import ProjectsHeader from "@/components/ProjectsHeader";
import Flex from "@/components/Flex";
import { IProject } from "@/redux/slices/projects";
import YearContainer from "@/components/YearContainer";
import MonthContainer from "@/components/MonthContainer";
import ProjectCard from "@/components/ProjectCard";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styled from "styled-components";

/* main */

const Projects: FC = () => {
	useDocumentTitle("Projects");

	const { projects } = useAppSelector((state) => state.projects);

	const splitProjectsByMonths = (projects: IProject[]): Record<number, Record<number, IProject[]>> => {
		let result: Record<number, Record<number, IProject[]>> = {};

		projects.forEach((project) => {
			const projectYear = new Date(project.createdAt).getFullYear();

			if (!result.hasOwnProperty(projectYear)) {
				result[projectYear] = {};
			}
		});

		projects.forEach((project) => {
			const projectDate = new Date(project.createdAt);
			const projectMonth = projectDate.getMonth();
			const projectYear = projectDate.getFullYear();

			if (result[projectYear].hasOwnProperty(projectMonth)) {
				result[projectYear][projectMonth].push(project);
			} else {
				result[projectYear][projectMonth] = [project];
			}
		});

		return result;
	};

	const [data, setData] = useState<Record<number, Record<number, IProject[]>>>([]);

	useEffect(() => {
		setData(splitProjectsByMonths(projects));
	}, [projects]);

	return (
		<StyledPage gap={40} column>
			<ProjectsHeader />
			{projects.length > 0 ? (
				Object.entries(data).map(([year, months], index) => (
					<YearContainer key={index} year={year}>
						{Object.entries(months).map(([month, projects], index) => (
							<MonthContainer key={index} monthNumber={+month}>
								{projects.map((project, index) => (
									<ProjectCard key={index} {...project} />
								))}
							</MonthContainer>
						))}
					</YearContainer>
				))
			) : (
				<Empty justifyContent="center" alignItems="center">
					I haven't found any projects, so it's empty...
				</Empty>
			)}
		</StyledPage>
	);
};

export default Projects;

const StyledPage = styled(Flex)`
	flex: 1 1 auto;
`;

const Empty = styled(Flex)`
	flex: 1 1 auto;
	font-size: 24px;
	line-height: calc(20 / 16);
	color: var(--400);
	font-weight: 500;
`;
