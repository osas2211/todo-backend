import React, { useContext, useState } from "react"
import { TextField, Button, Box } from "@mui/material"
import { actions, TasksContext } from "../context/tasks"
import axios from "axios"

export const AddTask = () => {
	const postData = async (task) => {
		try {
			return await axios.post("/api/v1/tasks", {
				task,
			})
		} catch (error) {
			console.log(error)
		}
	}
	const { dispatch } = useContext(TasksContext)
	const [input, setInput] = useState("")
	const addTask = (e) => {
		postData(input).then((data) => {
			dispatch({
				type: actions.POST_TASK,
				payload: {
					completed: false,
					task: input,
					_id: data.data.data._id,
				},
			})
		})

		setInput("")
	}
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<TextField
				label="Add Task"
				focused
				value={input}
				onChange={(e) => {
					setInput(e.target.value)
				}}
				sx={{
					input: {
						color: "#fff",
						width: "100%",
						display: "block",
						paddingY: 1,
					},
					width: "75%",
				}}
			></TextField>
			<Button
				variant="contained"
				sx={{ width: "20%", paddingY: 1 }}
				size="medium"
				onClick={addTask}
			>
				Add
			</Button>
		</Box>
	)
}
