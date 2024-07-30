import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "../../types/Reducer";
import { User } from "../../types/User";

interface UserState {
	loading: boolean
	user: User | null
}

const initialState: UserState = {
	loading: false,
	user: null
}

const setLoading: Reducer<UserState, boolean> = (state, { payload }) => {
	state.loading = payload
}

const setUser: Reducer<UserState, User | null> = (state, { payload }) => {
	state.user = payload
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser,
		setLoading,
	}
})

export default userSlice