import { User } from "./User"

export interface SessionTokenResponse {
	success: true
	sessionToken: string
}

export interface GetUserResponse {
	success: true
	user: User
}

export interface SuccessResponse {
	success: true
	message: string
}

export interface ErrorResponse {
	success: false
	message: string
}