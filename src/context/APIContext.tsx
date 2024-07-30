import React, { createContext } from 'react';
import APIService, { apiServiceToken } from '../services/APIService';
import { useInjection } from 'brandi-react';

export const APIContext = createContext<APIService | null>(null);

export const APIProvider: React.FC = ({ children }) => {
	const apiService = useInjection(apiServiceToken)

	return (
		<APIContext.Provider value={apiService}>
			{children}
		</APIContext.Provider>
	);
};
