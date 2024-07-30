import { ErrorResponse, GetUserResponse, SessionTokenResponse, SuccessResponse } from "../types/Responses";

export const response = {
	sessionToken: (sessionToken: string): SessionTokenResponse => ({
		success: true,
		sessionToken,
	}),
	user: (user: GetUserResponse['user']): GetUserResponse => ({
		success: true,
		user,
	}),
	success: (message: string): SuccessResponse => ({
		success: true,
		message,
	}),
	error: (message: string): ErrorResponse => ({
		success: false,
		message,
	}),
}