import { useEffect } from "react"
import { useAPI } from "./useAPI"
import { useSelector } from "../store"
import { useDispatch } from "react-redux"
import userSlice from "../store/slices/user"
import sessionSlice from "../store/slices/session"

export function useUser() {
	const api = useAPI()
	const dispatch = useDispatch()

	const { token } = useSelector(state => state.session)
	const {
		loading,
		user,
	} = useSelector(state => state.user)

	console.log('token: ', token)

	useEffect(() => {
		if (loading) return

		if (!token) {
			dispatch(userSlice.actions.setUser(null))
			return
		}

		async function fetchUser() {
			dispatch(userSlice.actions.setLoading(true))
			const response = await api.getUser(token)
			dispatch(userSlice.actions.setLoading(false))

			if (response.success) {
				dispatch(userSlice.actions.setUser(response.user))
			} else {
				dispatch(userSlice.actions.setUser(null))
				dispatch(sessionSlice.actions.setToken(null))
			}
		}

		if (!user) {
			fetchUser()
		}
	}, [dispatch, api.getUser, user, loading, token])

	return { loading, user }
}