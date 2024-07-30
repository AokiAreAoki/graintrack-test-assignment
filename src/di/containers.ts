import { Container } from 'brandi';
import APIService, { apiServiceToken } from '../services/APIService';
import AuthService, { authServiceToken } from '../services/AuthService';

const container = new Container();

container
	.bind(apiServiceToken)
	.toInstance(APIService)
	.inSingletonScope()

container
	.bind(authServiceToken)
	.toInstance(AuthService)
	.inSingletonScope()

export default container
