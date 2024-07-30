import React, { useCallback, useState } from "react"
import { useAuth } from "./useAuth"
import { useSelector } from "../store"

export function useSignIn() {
	const auth = useAuth()
	const isSignedIn = useSelector(state => !!state.session.token)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const signUp = useCallback(async () => {
		if (loading) return

		setLoading(true)
		const response = await auth.register(username, password)
		setLoading(false)

		if (response.success) {
			setError(null)
		} else {
			setError(response.message)
		}

		return response.success
	}, [auth.register, loading, username, password])

	const signIn = useCallback(async () => {
		if (loading) return

		setLoading(true)
		const response = await auth.login(username, password)
		setLoading(false)

		if (response.success) {
			setError(null)
		} else {
			setError(response.message)
		}

		return response.success
	}, [auth.login, loading, username, password])

	const onUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}, [setUsername])

	const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}, [setPassword])

	return {
		isSignedIn,
		loading,
		error,
		username,
		setUsername,
		onUsernameChange,
		password,
		setPassword,
		onPasswordChange,
		signUp,
		signIn,
	}
}
