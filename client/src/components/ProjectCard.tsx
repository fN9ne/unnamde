import { FC } from "react";
import styled, { css } from "styled-components";
import { IProject } from "@/redux/slices/projects";
import { setTextAndIconColor } from "@/functions";

/* my components */

import Flex from "./Flex";
import { Description } from "./Typography";

/* svg */

import CheckIcon from "@icons/check.svg?react";
import CloseIcon from "@icons/close.svg?react";
import ProgressCircle from "@icons/progressCircle.svg?react";
import ModifyIcon from "@icons/modify.svg?react";
import FlagIcon from "@icons/flag.svg?react";
import DeployIcon from "@icons/deploy.svg?react";
import { useNavigate } from "react-router-dom";

/* months */

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* main */

const ProjectCard: FC<IProject> = ({ id, name, image, status, description, lastModifiedAt, finishedAt, createdAt, tasks }) => {
	const progress = tasks.filter((task) => task.status === "done").length / (tasks.length / 100) || 0;

	const navigate = useNavigate();

	const formatDate = (date: string): string => {
		const currentDate = new Date(date);
		const hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
		const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();

		return `${hours}:${minutes}, ${shortMonths[currentDate.getMonth()]} ${currentDate.getDate()}`;
	};

	return (
		<StyledProjectCard onClick={() => navigate("/projects/" + id)} column gap={20}>
			<Flex column gap={12}>
				<ImageContainer>
					<Image src={`http://localhost:9983/${image}`} />
				</ImageContainer>
				<Title quantifier={progress} status={status} justifyContent="space-between" alignItems="center">
					<span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
					{status === "done" ? (
						<CheckIcon />
					) : status === "abandoned" ? (
						<CloseIcon />
					) : (
						<Progress alignItems="end" progress={progress} gap={4}>
							<span>{Math.round(progress)}%</span>
							<ProgressCircle />
						</Progress>
					)}
				</Title>
				<Description>{description}</Description>
			</Flex>
			<StyledDate type={status === "done" ? "finish" : lastModifiedAt !== null ? "modify" : "create"} gap={4}>
				{status === "done" ? <FlagIcon /> : lastModifiedAt !== null ? <ModifyIcon /> : <DeployIcon />}
				<span>
					{status === "done"
						? `Finished at ${formatDate(finishedAt || "")}`
						: lastModifiedAt !== null
						? `Last modified at ${formatDate(lastModifiedAt)}`
						: `Created at ${formatDate(createdAt)}`}
				</span>
			</StyledDate>
		</StyledProjectCard>
	);
};

export default ProjectCard;

/* styled components */

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: 200ms;
`;

const StyledProjectCard = styled(Flex)`
	cursor: pointer;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${Image} {
				scale: 1.1;
			}
		}
	}
`;

const ImageContainer = styled.div`
	overflow: hidden;
	width: 100%;
	aspect-ratio: 1 / 1;
	border-radius: 20px;
`;

const dateShouldForwardProp = (prop: string) => !["type"].includes(prop);

interface StyledDateProps {
	type: "finish" | "modify" | "create";
}

const dateStyles = {
	finish: css`
		${setTextAndIconColor("var(--correct)")};
	`,
	modify: css`
		${setTextAndIconColor("var(--primary)")};
	`,
	create: css`
		${setTextAndIconColor("var(--400)")};
	`,
};

const StyledDate = styled(Flex).withConfig({ shouldForwardProp: dateShouldForwardProp })<StyledDateProps>`
	font-size: 16px;
	${(props) => dateStyles[props.type as keyof typeof dateStyles]};
`;

const progressColors = {
	0: "#de1d1d",
	10: "#de481d",
	20: "#de6b1d",
	30: "#de721d",
	40: "#de8f1d",
	50: "#dea41d",
	60: "#dec11d",
	70: "#d8de1d",
	80: "#c9de1d",
	90: "#89de1d",
	100: "#1dde40",
};

interface ProgressProps {
	progress: number;
}

const progressShouldForwardProp = (prop: string) => !["progress"].includes(prop);

const Progress = styled(Flex).withConfig({ shouldForwardProp: progressShouldForwardProp })<ProgressProps>`
	font-weight: 600;
	font-size: 20px;
	color: ${(props) => progressColors[(Math.round(props.progress / 10) * 10) as keyof typeof progressColors]};

	span {
		font-size: 16px;
	}

	svg.stroke {
		rect:last-child {
			stroke: ${(props) => progressColors[(Math.round(props.progress / 10) * 10) as keyof typeof progressColors]};
		}
	}
`;

interface TitleProps extends Pick<IProject, "status"> {
	quantifier: number;
}

const titleShouldForwardProp = (prop: string) => !["status", "quantifier"].includes(prop);

const Title = styled(Flex).withConfig({ shouldForwardProp: titleShouldForwardProp })<TitleProps>`
	font-weight: 800;
	font-size: 20px;
	color: var(--800);

	${(props) =>
		props.status === "done"
			? css`
					svg.stroke path {
						stroke: var(--correct);
					}
					svg:not(.stroke) path {
						fill: var(--correct);
					}
			  `
			: props.status === "abandoned"
			? css`
					svg.stroke path {
						stroke: var(--error);
					}
					svg:not(.stroke) path {
						fill: var(--error);
					}
			  `
			: css`
					svg {
						rect:nth-child(2) {
							stroke: var(--correct);
							stroke-dasharray: 43 43;
							stroke-dashoffset: ${43 - 43 * (props.quantifier / 100 || 0)};
						}
					}
			  `}
`;
