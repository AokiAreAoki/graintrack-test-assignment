import { describe, expect, it } from "vitest";
import container from "../di/containers";
import { apiServiceToken } from "../services/APIService";
import { authServiceToken } from "../services/AuthService";

describe('containers', () => {
	it('singleton containers should have single instance', () => {
		const apiService = container.get(apiServiceToken);
		const apiService2 = container.get(apiServiceToken);

		const authService = container.get(authServiceToken);
		const authService2 = container.get(authServiceToken);

		expect(apiService).toBe(apiService2)
		expect(authService).toBe(authService2)
	})
})
