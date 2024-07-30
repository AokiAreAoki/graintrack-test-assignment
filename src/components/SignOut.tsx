import useSession from "../hooks/useSession";

export default function SignOut() {
	const { logout } = useSession()

	return <button onClick={logout}>Log out</button>
}