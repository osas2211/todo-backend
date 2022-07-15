const express = require("express")
const {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} = require("../controllers/tasks")

const router = express.Router()

router.get("/", getTasks)
router.post("/", createTask)
router.get("/:id", getTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router
