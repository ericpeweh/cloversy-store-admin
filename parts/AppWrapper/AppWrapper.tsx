// Dependencies
import axios from "axios";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Hooks
import useDispatch from "../../hooks/useDispatch";

// Action
import { setCredentials } from "../../store/slices/authSlice";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
	const dispatch = useDispatch();

	const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			const getToken = async () => {
				const token = await getAccessTokenSilently();

				dispatch(
					setCredentials({
						isAuth: true,
						token,
						full_name: user?.name ?? "",
						email: user?.email ?? "",
						profile_picture: user?.picture ?? "",
						email_verified: user?.email_verified ?? false
					})
				);

				await axios.get("http://localhost:5000/auth", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
			};
			getToken();
		}
	}, [getAccessTokenSilently, isAuthenticated, dispatch, user]);

	return (
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	);
};

export default AppWrapper;
