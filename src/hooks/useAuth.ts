import { useContext } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

export const useAuth = (): AuthService => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};