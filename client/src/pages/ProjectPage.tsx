import Flex from "@/components/Flex";
import { setTextAndIconColor } from "@/functions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "@/components/UI/Button";
import {
	ChevronLeftIcon,
	DeployIcon,
	ModifyIcon,
	EditIcon,
	InfoIcon,
	ProgressCircle,
	StatusIcon,
	ProgressIcon,
	CheckIcon,
	CancelIcon,
	GithubIcon,
	WindowIcon,
	CommitIcon,
	PlayIcon,
	DeleteIcon,
} from "@/components/Icons";
import { IProject } from "@/redux/slices/projects";
import { useActions } from "@/hooks/useActions";

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface CommitInfo {
	sha: string;
	date: string;
}

const ProjectPage: FC = () => {
	const { projectId } = useParams();

	const { projects } = useAppSelector((state) => state.projects);
	const project = projects.find((project) => (projectId ? project.id === +projectId : undefined));

	const { openModal, setProjectToDelete } = useActions();

	useDocumentTitle(project ? `«${project.name}»` : "");

	const navigate = useNavigate();

	const progress = project
		? project.tasks.filter((task) => task.status === "done").length / (project.tasks.length / 100) || 0
		: 0;

	const formatDate = (date: string): string => {
		const currentDate = new Date(date);
		const hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
		const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();

		return `${hours}:${minutes}, ${shortMonths[currentDate.getMonth()]} ${currentDate.getDate()}`;
	};

	const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null);

	useEffect(() => {
		const fetchCommitInfo = async () => {
			if (project && project.repositoryUrl) {
				try {
					const { default_branch } = await fetch(
						`https://api.github.com/repos/fN9ne/${project.repositoryUrl.split("/")[project.repositoryUrl.split("/").length - 1]}`
					).then((response) => response.json());

					const response = await fetch(
						`https://api.github.com/repos/fN9ne/${
							project.repositoryUrl.split("/")[project.repositoryUrl.split("/").length - 1]
						}/commits/${default_branch}`
					).then((response) => response.json());

					setCommitInfo({
						sha: response.sha.slice(0, 7),
						date: response.commit.committer.date,
					});
				} catch (error) {
					console.error("Error fetching commit info", error);
				}
			}
		};

		if (project) {
			fetchCommitInfo();
		}
	}, [project]);

	const formatDateAgo = (dateString: string): string => {
		const date = new Date(dateString);
		const currentDate = new Date();
		const diffInSeconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

		const secondsInMinute = 60;
		const secondsInHour = 3600;
		const secondsInDay = 86400;
		const secondsInWeek = 604800;
		const secondsInMonth = 2592000;
		const secondsInYear = 31536000;

		if (diffInSeconds < secondsInMinute) {
			return `${diffInSeconds} sec ago`;
		} else if (diffInSeconds < secondsInHour) {
			const minutes = Math.floor(diffInSeconds / secondsInMinute);
			return `${minutes} min ago`;
		} else if (diffInSeconds < secondsInDay) {
			const hours = Math.floor(diffInSeconds / secondsInHour);
			return `${hours} hour ago`;
		} else if (diffInSeconds < secondsInWeek) {
			const days = Math.floor(diffInSeconds / secondsInDay);
			return `${days} day ago`;
		} else if (diffInSeconds < secondsInMonth) {
			const weeks = Math.floor(diffInSeconds / secondsInWeek);
			return `${weeks} week ago`;
		} else if (diffInSeconds < secondsInYear) {
			const months = Math.floor(diffInSeconds / secondsInMonth);
			return `${months} month ago`;
		} else {
			const years = Math.floor(diffInSeconds / secondsInYear);
			return `${years} year ago`;
		}
	};

	const handleRemoveProject = () => {
		if (project) {
			openModal("removeProject");
			setProjectToDelete(project.id);
		}
	};

	return (
		project && (
			<Flex gap={60}>
				<Main column gap={20}>
					<Flex column gap={32}>
						<ReturnButton onClick={() => navigate(-1)}>
							<ChevronLeftIcon />
							<span>Return back</span>
						</ReturnButton>
						<Flex column gap={20}>
							<Flex justifyContent="space-between">
								<ImageContainer>
									<Image src={`http://localhost:9983/${project.image}`} />
									<ImageCircle1 />
									<ImageCircle2 />
								</ImageContainer>
								<Flex column alignItems="end" justifyContent="space-between">
									<Button fit icon={EditIcon} style="transparent">
										Edit
									</Button>
									<Progress gap={8} alignItems="end" progress={progress}>
										<span>{Math.round(progress)}%</span>
										<ProgressCircle />
									</Progress>
								</Flex>
							</Flex>
							<TitleContainer alignItems="center" justifyContent="space-between">
								<Title>{project.name.charAt(0).toUpperCase() + project.name.slice(1)}</Title>
								<Version>v{project.version}</Version>
							</TitleContainer>
							<Description>{project.description}</Description>
							<Flex column gap={8}>
								<StyledDate type="create">
									<DeployIcon />
									<span>Created at {formatDate(project.createdAt)}</span>
								</StyledDate>
								{project.lastModifiedAt && (
									<StyledDate type="modify">
										<ModifyIcon />
										<span>Last modified at {formatDate(project.lastModifiedAt)}</span>
									</StyledDate>
								)}
							</Flex>
						</Flex>
						<Flex column gap={20}>
							<Divider />
							<Flex column gap={12}>
								<SubTitle gap={8}>
									<InfoIcon />
									<span>Information</span>
								</SubTitle>
								<Flex column gap={20}>
									<Flex gap={12}>
										<Label>
											<StatusIcon />
											<span>Status</span>
										</Label>
										<Value>
											<Status status={project.status}>
												{project.status === "done" ? (
													<>
														<CheckIcon />
														<span>Done</span>
													</>
												) : project.status === "in progress" ? (
													<>
														<ProgressIcon />
														<span>In progress</span>
													</>
												) : (
													<>
														<CancelIcon />
														<span>Abandoned</span>
													</>
												)}
											</Status>
										</Value>
									</Flex>
									{project.repositoryUrl && (
										<>
											<Flex gap={12}>
												<Label>
													<GithubIcon />
													<span>Github repository</span>
												</Label>
												<Value>
													<GithubLink href={project.repositoryUrl} target="_blank">
														<WindowIcon />
														<span>{project.name.charAt(0).toUpperCase() + project.name.slice(1)}</span>
													</GithubLink>
												</Value>
											</Flex>
											{commitInfo && (
												<Flex gap={12}>
													<Label>
														<CommitIcon />
														<span>Last commit</span>
													</Label>
													<Value>
														{commitInfo.sha} • {formatDateAgo(commitInfo.date)}
													</Value>
												</Flex>
											)}
										</>
									)}
									{project.productionUrl && (
										<Flex gap={12}>
											<Label>
												<PlayIcon />
												<span>Production</span>
											</Label>
											<Value>
												<Link href={project.productionUrl} target="_blank">
													<WindowIcon />
													<span>Open</span>
												</Link>
											</Value>
										</Flex>
									)}
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Footer alignItems="end">
						<Button onClick={handleRemoveProject} fit icon={DeleteIcon} style="error">
							Delete project
						</Button>
					</Footer>
				</Main>
			</Flex>
		)
	);
};

export default ProjectPage;

/* components */

const Footer = styled(Flex)`
	flex: 1 1 auto;
	padding: 12px 0 0 0;
`;
const Main = styled(Flex)`
	flex: 0 0 380px;
`;

const ReturnButton = styled(Flex).attrs({ as: "button" })`
	font-weight: 500;
	font-size: 16px;
	background-color: transparent;
	${setTextAndIconColor("var(--400)")};
	transition: 200ms;

	&:hover {
		${setTextAndIconColor("var(--600)")};
	}
`;

const ImageContainer = styled.div`
	position: relative;
`;
const Image = styled.img`
	width: 128px;
	height: 128px;
	border-radius: 28px;
	object-fit: cover;
	position: relative;
	z-index: 1;
`;
const ImageCircle = styled.div`
	position: absolute;
	border-radius: 50%;
	background-color: var(--primary-lighter);
	aspect-ratio: 1/1;
`;
const ImageCircle1 = styled(ImageCircle)`
	right: -32px;
	bottom: -12px;
	opacity: 0.5;
	width: 77px;
`;
const ImageCircle2 = styled(ImageCircle)`
	top: 17px;
	right: -44px;
	opacity: 0.5;
	width: 37px;
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

	svg.stroke {
		width: 70px;

		rect:last-child {
			stroke: ${(props) => progressColors[(Math.round(props.progress / 10) * 10) as keyof typeof progressColors]};
			stroke-dasharray: 44 44;
			stroke-dashoffset: ${(props) => 44 - 44 * (props.progress / 100 || 0)};
		}
	}
`;

const TitleContainer = styled(Flex)`
	padding: 0 0 12px 0;
	border-bottom: 1px solid var(--100);
`;
const Title = styled.h1`
	font-weight: 800;
	font-size: 32px;
	color: var(--800);
`;
const Description = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: calc(20 / 16);
	color: var(--500);
`;
const Version = styled.div`
	font-weight: 600;
	font-size: 20px;
	color: var(--400);
`;

const styledDateColors = {
	create: setTextAndIconColor("var(--400)"),
	modify: setTextAndIconColor("var(--primary)"),
};
interface StyledDateProps {
	type: "create" | "modify";
}
const dateShouldForwardProp = (prop: string) => !["type"].includes(prop);
const StyledDate = styled(Flex).withConfig({ shouldForwardProp: dateShouldForwardProp })<StyledDateProps>`
	font-size: 16px;
	${(props) => styledDateColors[props.type as keyof typeof styledDateColors]};
`;
StyledDate.defaultProps = {
	gap: 4,
};
const Divider = styled.div`
	height: 2px;
	border-radius: 1px;
	background-color: var(--100);
	width: 100%;
`;

const SubTitle = styled(Flex).attrs({ as: "h2" })`
	font-size: 20px;
	font-weight: 600;
	color: var(--800);
`;

const Label = styled(Flex)`
	font-size: 16px;
	flex: 0 0 200px;
	${setTextAndIconColor("var(--500)")};
`;
Label.defaultProps = {
	gap: 4,
};
const Link = styled(Flex).attrs({ as: "a" })`
	transition: 200ms;

	&:hover {
		opacity: 0.65;
	}
`;
Link.defaultProps = {
	gap: 6,
};

const Value = styled.div`
	font-weight: 500;
	font-size: 16px;

	&,
	a {
		color: var(--800);
	}

	${Link} {
		${setTextAndIconColor("var(--primary)")};
	}
`;

const statusColors = {
	done: setTextAndIconColor("var(--correct)"),
	"in progress": setTextAndIconColor("#E1C41E"),
	abandoned: setTextAndIconColor("var(--error)"),
};
interface StatusProps {
	status: IProject["status"];
}
const statusShouldForwardProp = (prop: string) => !["status"].includes(prop);
const Status = styled(Flex).withConfig({ shouldForwardProp: statusShouldForwardProp })<StatusProps>`
	${(props) => statusColors[props.status as keyof typeof statusColors]};
`;
Status.defaultProps = {
	gap: 6,
};
const GithubLink = styled(Flex).attrs({ as: "a" })`
	cursor: pointer;
	transition: 200ms;

	&:hover {
		opacity: 0.65;
	}

	svg path {
		fill: var(--primary);
	}
`;
GithubLink.defaultProps = {
	gap: 6,
};
