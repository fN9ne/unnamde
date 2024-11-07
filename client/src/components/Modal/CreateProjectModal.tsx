import { FC } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

import ModalWrapper from "./ModalWrapper";
import styled from "styled-components";
import Flex from "../Flex";

const ModalContent = styled(Flex)`
	max-width: 575px;
	padding: 40px;
	background-color: var(--0);
	border-radius: 20px;
`;

const CreateProjectModal: FC = () => {
	const { createProject } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper isActive={createProject} name="createProject">
			<ModalContent column gap={32}></ModalContent>
		</ModalWrapper>
	);
};

export default CreateProjectModal;
