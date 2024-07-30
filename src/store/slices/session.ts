import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "../../types/Reducer";

interface SessionState {
	token: string | null
}

const initialState: SessionState = {
	token: null
}

const setToken: Reducer<SessionState, string> = (state, { payload }) => {
	state.token = payload
}

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setToken,
	}
})

export default sessionSlice