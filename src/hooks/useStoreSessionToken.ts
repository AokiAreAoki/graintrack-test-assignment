import { useInjection } from "brandi-react";
import { authServiceToken } from "../services/AuthService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import sessionSlice from "../store/slices/session";

export default function useStoreSessionToken() {
	const dispatch = useDispatch()
	const authService = useInjection(authServiceToken)

	useEffect(() => {
		const onTokenChange = ({ detail: token }) => {
			dispatch(sessionSlice.actions.setToken(token))
		}

		authService.addEventListener('sessionTokenChange', onTokenChange)

		return () => {
			authService.removeEventListener('sessionTokenChange', onTokenChange)
		}
	}, [dispatch, authService])
}