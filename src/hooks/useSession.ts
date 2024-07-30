import { useCallback } from "react"
import { useAuth } from "./useAuth"
import { useSelector } from "../store"
import { useNavigate } from "@tanstack/react-router"

export default function useSession() {
	const navigate = useNavigate()
	const auth = useAuth()
	const isLoggedIn = useSelector(state => !!state.session.token)

	const logout = useCallback(() => {
		auth.logout()
		navigate('/')
	}, [auth.logout, navigate])

	return { isLoggedIn, logout }
}
