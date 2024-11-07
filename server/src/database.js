const path = require("path");
const fs = require("fs");

class Database {
	constructor(databasePath) {
		this.databasePath = databasePath;
	}

	async _readDatabase() {
		try {
			const data = await fs.promises.readFile(this.databasePath, "utf-8");

			return JSON.parse(data);
		} catch (error) {
			if (error.code === "ENOENT") {
				return {};
			} else {
				throw error;
			}
		}
	}

	async _writeDatabase(data) {
		try {
			await fs.promises.writeFile(this.databasePath, JSON.stringify(data, null, 2), "utf-8");
		} catch (error) {
			throw new Error("Data could not be written to the database:", error);
		}
	}
}

const db = new Database(path.join(__dirname, "db.json"));

module.exports = db;
