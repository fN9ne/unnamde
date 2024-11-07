import { FC } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

import ModalWrapper from "./ModalWrapper";
import styled from "styled-components";
import Flex from "../Flex";
import { setTextAndIconColor } from "@/functions";
import { CancelIcon, DeleteIcon } from "../Icons";
import Button from "../UI/Button";
import { useActions } from "@/hooks/useActions";
import { useDeleteProjectMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/routes";

const ModalContent = styled(Flex)`
	max-width: 575px;
	padding: 40px;
	background-color: var(--0);
	border-radius: 20px;
`;

const RemoveProjectModal: FC = () => {
	const { removeProject } = useAppSelector((state) => state.modal);
	const { projects, projectToDelete } = useAppSelector((state) => state.projects);

	const { closeModal, setProjectToDelete } = useActions();

	const project = projects.find((project) => project.id === projectToDelete);
	const [deleteProject] = useDeleteProjectMutation();

	const navigate = useNavigate();

	const handleDelete = async () => {
		if (projectToDelete !== null) {
			try {
				await deleteProject(projectToDelete.toString());
				navigate(AppRoutes.AllProjects);
				handleCancel();
			} catch (error) {
				console.error("Delete project error", error);
			}
		}
	};

	const handleCancel = () => {
		closeModal("removeProject");
		setProjectToDelete(null);
	};

	return (
		<ModalWrapper isActive={removeProject} name="removeProject">
			<ModalContent column gap={32}>
				<Flex column gap={20}>
					<Title gap={12}>
						<DeleteIcon />
						<span>Delete project</span>
					</Title>
					<Description>
						Are you sure you want to delete{" "}
						{!project ? "this project" : <strong>«{project.name.charAt(0).toUpperCase() + project.name.slice(1)}»</strong>}? This
						action is permanent and cannot be undone. All associated data will be removed.
					</Description>
				</Flex>
				<Flex gap={12}>
					<Button onClick={handleDelete} icon={DeleteIcon} fit style="error">
						Delete
					</Button>
					<Button onClick={handleCancel} icon={CancelIcon} fit style="bordered">
						Cancel
					</Button>
				</Flex>
			</ModalContent>
		</ModalWrapper>
	);
};

export default RemoveProjectModal;

const Title = styled(Flex)`
	font-size: 32px;
	font-weight: 700;
	${setTextAndIconColor("var(--800)")};
`;
const Description = styled.div`
	font-size: 16px;
	line-height: calc(20 / 16);
	font-weight: 500;
	color: var(--400);

	strong {
		background: linear-gradient(135deg, rgba(44, 172, 252, 1) 25%, rgba(104, 231, 240, 1) 125%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
`;
