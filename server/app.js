const express = require("express")
const app = express()
const tasksRoutes = require("./routes/tasks.routes")
const connectDB = require("./db/connect")

//use environment variable
require("dotenv").config()

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use("/api/v1/tasks/", tasksRoutes)
app.all("*", (req, res) => {
	res.status(404).json({ status: "failed" })
})

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		console.log("connected to mongoDB")
		app.listen(process.env.PORT, () => {
			console.log("server is running")
		})
	} catch (error) {
		console.log(error)
	}
}

start()
