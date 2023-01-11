// Dependencies
import axios from "axios";
import { shallowEqual } from "react-redux";

// Hooks
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Action
import { setAuthStatus, setCredentials } from "../../store/slices/authSlice";

// Types
import { User } from "../../interfaces";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import AuthActions from "../../components/AuthActions/AuthActions";
import NotificiationLayer from "../NotificationLayer/NotificiationLayer";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
	const dispatch = useDispatch();
	const { status: authStatus, user_role: userRole } = useSelector(
		state => state.auth,
		shallowEqual
	);

	const { isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			const getToken = async () => {
				const token = await getAccessTokenSilently();

				dispatch(setAuthStatus("loading"));
				const res = await axios.get<
					void,
					{ data: { data: { user: User } }; status: "success" | "error" }
				>(`http://localhost:5000/auth`, {
					headers: {
						Authorization: `Bearer ${token}`
					},
					withCredentials: true
				});

				const userData = res.data.data.user;

				dispatch(
					setCredentials({
						isAuth: true,
						token,
						email: user?.email ?? "",
						email_verified: user?.email_verified ?? false,
						full_name: userData?.full_name ?? "",
						contact: userData?.contact ?? "",
						profile_picture: userData?.profile_picture ?? "",
						birth_date: userData?.birth_date ?? "",
						status: "fulfilled",
						user_role: userData?.user_role
					})
				);
			};
			getToken();
		}
	}, [getAccessTokenSilently, isAuthenticated, dispatch, user]);

	return (
		<>
			<AuthActions />
			{((!isAuthenticated && authStatus !== "idle") || isLoading || authStatus === "loading") && (
				<LoadingScreen isOpen={true} />
			)}
			{isAuthenticated && userRole === "admin" && (
				<>
					<Header />
					<Sidebar />
					<NotificiationLayer />
					{children}
				</>
			)}
		</>
	);
};

export default AppWrapper;
