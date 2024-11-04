import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FC } from "react";
import { useParams } from "react-router-dom";

const ProjectPage: FC = () => {
	const { projectName } = useParams();

	useDocumentTitle(projectName ? `«${projectName}»` : "");

	return <div>ProjectPage</div>;
};

export default ProjectPage;
