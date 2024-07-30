import { useContext } from "react";
import APIService from "../services/APIService";
import { APIContext } from "../context/APIContext";

export const useAPI = (): APIService => {
	const context = useContext(APIContext);

	if (!context) {
		throw new Error("useAPI must be used within an APIProvider");
	}

	return context;
};