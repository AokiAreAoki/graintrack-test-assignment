import { token } from "brandi"
import { ErrorResponse, GetUserResponse, SessionTokenResponse, SuccessResponse } from "../types/Responses"
import { response } from "../utils/responses"
import { wait } from "../utils/wait"

export default class APIService {
	constructor() { }

	async register(username: string, password: string): Promise<SessionTokenResponse | ErrorResponse> {
		// Mock registration logic
		await wait(2e3)

		const sessionToken = registerUser(username, password)

		return sessionToken
			? response.sessionToken(sessionToken)
			: response.error('This user already exists')
	}

	async login(username: string, password: string): Promise<SessionTokenResponse | ErrorResponse> {
		// Mock login logic
		await wait(2e3)

		const sessionToken = loginUser(username, password)

		return sessionToken
			? response.sessionToken(sessionToken)
			: response.error('This user does not exists or password is incorrect')
	}

	async logout(sessionToken: string): Promise<SuccessResponse | ErrorResponse> {
		await wait(2e3)

		if (doesSessionExist(sessionToken)) {
			expireSession(sessionToken)
		} else {
			return response.error('Invalid token session')
		}

		return response.success('Logged out')
	}

	async getUser(sessionToken: string): Promise<GetUserResponse | ErrorResponse> {
		await wait(2e3)

		const user = getUser(sessionToken)

		return user
			? response.user(user)
			: response.error('Invalid session token')
	}
}

export const apiServiceToken = token<APIService>('apiService')

const MOCK_UP_USERS: MockedUser[] = [
	{
		username: 'admin',
		password: 'admin',
	},
	{
		username: 'user',
		password: 'user',
	},
]

function registerUser(username: string, password: string) {
	const user = MOCK_UP_USERS.find(u => u.username === username)
	if (user) return null

	const newUser = { username, password }
	MOCK_UP_USERS.push(newUser)
	return createSessionToken(newUser)
}

function loginUser(username: string, password: string) {
	const user = MOCK_UP_USERS.find(u => u.username === username)

	if (!user || password !== user.password) {
		return null
	}

	return createSessionToken(user)
}

// since i don't have an actual API i'll user username as a session token
// this way i can preserve session after page reload
function createSessionToken(user: MockedUser) {
	return user.username
}

function doesSessionExist(sessionToken: string) {
	return !!MOCK_UP_USERS.find(u => u.username === sessionToken)
}

function expireSession(sessionToken: string) {
	// imagine we have an actual back end
	console.log(`Expiring token: ${sessionToken}`)
}

function getUser(token: string) {
	return MOCK_UP_USERS.find(u => u.username === token)
}

interface MockedUser {
	username: string
	password: string
}