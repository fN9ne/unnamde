const db = require("../database");

const getProjects = async (_, res) => {
	try {
		const data = await db._readDatabase();

		res.status(200).json(data.projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const createProject = async (req, res) => {
	const project = req.body;

	try {
		const data = await db._readDatabase();

		const { projects } = data;

		const newProjects = [...projects, project];

		await db._writeDatabase({ ...data, projects: newProjects });

		res.status(200).json(newProjects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const deleteProject = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await db._readDatabase();

		const { projects } = data;

		const newProjects = projects.filter((project) => project.id !== +id);

		await db._writeDatabase({
			...data,
			projects: newProjects,
		});

		res.status(200).json(newProjects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	getProjects,
	createProject,
	deleteProject,
};
