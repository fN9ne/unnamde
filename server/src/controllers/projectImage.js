const db = require("../database.js");

const uploadProjectImage = async (req, res) => {
	try {
		const projectId = req.body.projectId;
		const imagePath = req.file.path;

		const data = await db._readDatabase();

		const { projects } = data;

		const currentProject = projects.find((project) => project.id === +projectId);

		if (currentProject) {
			const newProject = {
				...currentProject,
				image: imagePath,
			};

			const newProjects = projects.map((project) => (project.id === +projectId ? newProject : project));

			await db._writeDatabase({
				...data,
				projects: newProjects,
			});

			res.status(200).json({ message: "Project image uploaded successfully", imagePath });
		} else {
			res.status(404).json({ message: "Project not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { uploadProjectImage };
