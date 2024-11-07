import { FC, useEffect, useState } from "react";
import { useActions } from "@/hooks/useActions";
import { useInput } from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useAppSelector";
import { IProject } from "@/redux/slices/projects";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* my components */

import Flex from "./Flex";
import Button from "./UI/Button";
import { Title } from "./Typography";
import Searchbox from "./UI/Searchbox";
import Select from "./UI/Select";

/* svg */

import AddIcon from "@icons/add.svg?react";
import FilterIcon from "@icons/filter.svg?react";

/* main */

export type SortType = "New ones first" | "The old ones first" | "Last modified";

const ProjectsHeader: FC = () => {
	const { openModal, setSortType } = useActions();

	const { projects } = useAppSelector((state) => state.projects);

	const query = useInput("", {});
	const [findedProjects, setFindedProjects] = useState<IProject[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		setFindedProjects(projects.filter((project) => project.name.toLowerCase().startsWith(query.value.toLowerCase())));
	}, [query.value]);

	return (
		<Flex alignItems="center" justifyContent="space-between">
			<Title sup={projects.length || 0}>Projects</Title>
			<Flex gap={12}>
				<Select
					icon={FilterIcon}
					placeholder="Sort"
					values={["New ones first", "The old ones first", "Last modified"]}
					onPick={(value) => setSortType(value as SortType)}
				/>
				<Searchbox query={query.value} onChange={query.onChange}>
					{findedProjects.length > 0 ? (
						findedProjects.map((project, index) => (
							<DropdownItem
								key={index}
								onClick={() => navigate("/projects/" + project.id)}
								gap={10}
								alignItems="center"
								padding={[8, 10]}
							>
								<img src={`http://localhost:9983/${project.image}`} />
								<span>{project.name}</span>
							</DropdownItem>
						))
					) : (
						<EmptyBox justifyContent="center" alignItems="center">
							Nothing was found
						</EmptyBox>
					)}
				</Searchbox>
				<Button onClick={() => openModal("createProject")} fit icon={AddIcon}>
					Create project
				</Button>
			</Flex>
		</Flex>
	);
};

export default ProjectsHeader;

/* styled components */

const EmptyBox = styled(Flex)`
	width: 100%;
	height: 30px;
	color: var(--400);
`;

const DropdownItem = styled(Flex)`
	height: 30px;
	color: var(--800);
	font-weight: 500;
	cursor: pointer;
	opacity: 0.5;
	transition: 200ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			opacity: 1;
		}
	}

	img {
		width: 14px;
		height: 14px;
		border-radius: 4px;
	}
`;
