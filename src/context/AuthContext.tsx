import React, { createContext } from 'react';
import AuthService, { authServiceToken } from '../services/AuthService';
import { useInjection } from 'brandi-react';

export const AuthContext = createContext<AuthService | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
	const authService = useInjection(authServiceToken)

	return (
		<AuthContext.Provider value={authService}>
			{children}
		</AuthContext.Provider>
	);
};
