import { useReducer, useEffect, createContext } from "react"
import axios from "axios"
export const TasksContext = createContext()

export const actions = {
	GET_TASKS: "GET_TASKS",
	POST_TASK: "POST_TASK",
	UPDATE_TASK: "UPDATE_TASK",
	DELETE_TASK: "DELETE_TASK",
}

const reducer = (state, action) => {
	switch (action.type) {
		case actions.POST_TASK:
			if (action.payload.task !== "") {
				return {
					...state,
					data: [...state.data, action.payload],
				}
			}
			return state
		case actions.UPDATE_TASK: {
			const data = state.data.map((task) => {
				if (task._id === action.payload.id) {
					if (action.payload.completed === true) {
						task.completed = false
					} else if (action.payload.completed === false) {
						task.completed = true
					}
					if (action.payload.completed === undefined) {
						task.task = action.payload.task
					}
				}
				return task
			})
			return { ...state, data }
		}
		case actions.DELETE_TASK: {
			return {
				...state,
				data: state.data.filter((task) => {
					return task._id !== action.payload.id
				}),
			}
		}
		case actions.GET_TASKS: {
			return {
				...state,
				data: action.payload,
			}
		}
		default:
			return state
	}
}

export const TasksProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		status: true,
		data: [],
	})
	const getTasks = async () => {
		const response = await axios.get("/api/v1/tasks")
		const data = await response.data
		dispatch({ type: actions.GET_TASKS, payload: data.data })
	}
	useEffect(() => {
		getTasks()
	}, [])
	return (
		<TasksContext.Provider value={{ state, dispatch }}>
			{children}
		</TasksContext.Provider>
	)
}
