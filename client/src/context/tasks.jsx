import { useReducer, createContext } from "react"

export const TasksContext = createContext()

export const actions = {
	POST_TASK: "POST_TASK",
	UPDATE_TASK: "UPDATE_TASK",
	DELETE_TASK: "DELETE_TASK",
}

const initState = {
	success: true,
	data: [
		{
			id: 1,
			task: "Create frontend",
			completed: false,
		},
		{
			id: 2,
			task: "Create Backend",
			completed: false,
		},
		{
			id: 3,
			task: "Project setup",
			completed: true,
		},
	],
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
				if (task.id === action.payload.id) {
					if (action.payload.completed === true) task.completed = false
					else if (action.payload.completed === false) task.completed = true
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
					return task.id !== action.payload.id
				}),
			}
		}
		default:
			return state
	}
}

export const TasksProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState)
	return (
		<TasksContext.Provider value={{ state, dispatch }}>
			{children}
		</TasksContext.Provider>
	)
}
