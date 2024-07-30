import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import SignOut from '../components/SignOut'
import useSession from '../hooks/useSession'
import useStoreSessionToken from '../hooks/useStoreSessionToken'

export const Route = createRootRoute({
	component: Root,
})

function Root() {
	useStoreSessionToken()

	return (
		<>
			<div className="p-2 flex gap-2">
				<div className="p-2 flex gap-2">
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>{' '}
					<Link to="/about" className="[&.active]:font-bold">
						About
					</Link>
				</div>

				<div className="p-2 flex gap-2">
					<AccountButtons />
				</div>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}

function AccountButtons() {
	const { isLoggedIn } = useSession()

	if (isLoggedIn) {
		return (
			<>
				<Link to="/profile" className="[&.active]:font-bold">
					Profile
				</Link>
				<SignOut />
			</>
		)
	}

	return (
		<Link to="/login" className="[&.active]:font-bold">
			Log in
		</Link>
	)
}
