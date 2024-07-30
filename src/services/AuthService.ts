import { BehaviorSubject, Observable } from "rxjs";
import APIService, { apiServiceToken } from './APIService';
import { injected, token } from "brandi";

export default class AuthService extends EventTarget {
	private apiService: APIService
	private readonly sessionTokenSubject: BehaviorSubject<string | null>;
	public readonly sessionTokenObservable: Observable<string | null>;

	constructor(apiService: APIService) {
		super()
		this.apiService = apiService
		this.sessionTokenSubject = new BehaviorSubject<string | null>(null);
		this.sessionTokenObservable = this.sessionTokenSubject.asObservable();

		this.sessionTokenObservable.subscribe(value => {
			this.dispatchEvent(new CustomEvent('sessionTokenChange', {
				detail: value
			}))
		})
	}

	async register(username: string, password: string) {
		const response = await this.apiService.register(username, password)

		if (response.success) {
			this.sessionTokenSubject.next(response.sessionToken)
		}

		return response
	}

	async login(username: string, password: string) {
		const response = await this.apiService.login(username, password)

		console.log(` AuthService.login: "${username}", "${password}"`, response)

		if (response.success) {
			this.sessionTokenSubject.next(response.sessionToken)
		}

		return response
	}

	async logout() {
		// We want to log out and remove local copy of session token even if server fails to log us out
		this.sessionTokenSubject.next(null);

		const response = await this.apiService.logout(this.sessionTokenValue)
		return response
	}

	get sessionTokenValue() {
		return this.sessionTokenSubject.value
	}
}

injected(AuthService, apiServiceToken)

export const authServiceToken = token<AuthService>('authService')