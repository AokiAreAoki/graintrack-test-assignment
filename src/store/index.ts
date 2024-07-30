import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sessionSlice from './slices/session';
import { UseSelector, useSelector as untypedUseSelector } from 'react-redux';
import userSlice from './slices/user';
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist'
// import { thunk } from 'redux-thunk'

const combinedReducer = combineReducers({
	session: sessionSlice.reducer,
	user: userSlice.reducer,
})

const persistedReducer = persistReducer({
	key: 'root',
	storage: storageSession,
	whitelist: ['session'],
}, combinedReducer)

const store = configureStore({
	reducer: persistedReducer,
	// middleware: [thunk],
})

export const useSelector = untypedUseSelector as UseSelector<ReturnType<typeof store.getState>>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

export default store