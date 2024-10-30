import { FC } from "react";
import styled from "styled-components";

/* my components */

import Flex from "./Flex";
import Button from "./UI/Button";
import { Title } from "./Typography";

/* svg */

import AddIcon from "@icons/add.svg?react";
import { useActions } from "@/hooks/useActions";
import Searchbox from "./UI/Searchbox";

/* main */

const ProjectsHeader: FC = () => {
	const { openModal } = useActions();

	return (
		<Flex alignItems="center" justifyContent="space-between">
			<Title sup={5}>Projects</Title>
			<Flex gap={12}>
				<Searchbox />
				<Button onClick={() => openModal("createProject")} fit icon={AddIcon}>
					Create project
				</Button>
			</Flex>
		</Flex>
	);
};

export default ProjectsHeader;
