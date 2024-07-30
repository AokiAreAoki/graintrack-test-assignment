import { expect, it, describe } from "vitest";
import { renderHook } from '@testing-library/react-hooks'
import { useSignIn } from "../hooks/useSignIn"
import { AuthProvider } from "../context/AuthContext";
import { APIProvider } from "../context/APIContext";
import { ContainerProvider } from "brandi-react";
import container from "../di/containers";
import { useUser } from "../hooks/useUser";
import { act } from "react";

const wrapper = ({ children }) => (
	<ContainerProvider container={container}>
		<APIProvider>
			<AuthProvider>
				{children}
			</AuthProvider>
		</APIProvider>
	</ContainerProvider>
)

describe('useSigner and useUser', () => {
	it('should not throw error when rendered in the AuthContext', () => {
		const { result } = renderHook(useSignIn, { wrapper })

		expect(result.error)
			.toBe(undefined)
	})

	it('should sign in as admin', async () => {
		const {
			result,
			// waitForValueToChange,
			// waitForNextUpdate,
			// waitFor,
			// rerender,
		} = renderHook(() => ({
			useSignIn: useSignIn(),
			useUser: useUser(),
		}), { wrapper });

		expect(result.current.useUser.user).toBe(null);

		act(() => {
			result.current.useSignIn.setUsername('admin')
		})

		expect(result.current.useSignIn.username).toBe('admin');

		act(() => {
			result.current.useSignIn.setPassword('admin')
		})

		expect(result.current.useSignIn.password).toBe('admin');

		act(() => {
			result.current.useSignIn.signIn()
		})

		// await waitFor(() => expect(result.current.useUser.loading).toEqual(false), {
		// 	interval: 100,
		// 	timeout: 10e3,
		// })

		// rerender()
		// await waitForNextUpdate({ timeout: 12e3 })

		// expect(result.current.useUser.loading).toEqual(false)

		// expect(result.current.useUser.user).toEqual({
		// 	username: 'admin',
		// 	password: 'admin',
		// });
	});
});
