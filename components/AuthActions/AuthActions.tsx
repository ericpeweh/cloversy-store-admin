// Dependencies
import React from "react";
import { shallowEqual } from "react-redux";

// Styles
import { AuthActionsContainer, InformationText, LogoContainer } from "./AuthActions.styles";

// Hooks
import useSelector from "../../hooks/useSelector";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import Button from "../Button/Button";
import Image from "next/image";

const AuthActions = () => {
	const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const { status: authStatus, user_role: userRole } = useSelector(
		state => state.auth,
		shallowEqual
	);

	return (
		<>
			{!isLoading && !isAuthenticated && (
				<AuthActionsContainer>
					<LogoContainer>
						<Image
							src="/images/logo.png"
							layout="responsive"
							width={200}
							height={80}
							alt="Cloversy.id logo"
						/>
					</LogoContainer>
					<InformationText>Please login to access dashboard</InformationText>
					<Button onClick={loginWithRedirect}>Login</Button>
				</AuthActionsContainer>
			)}
			{!isLoading && isAuthenticated && authStatus === "fulfilled" && userRole !== "admin" && (
				<AuthActionsContainer>
					<LogoContainer>
						<Image
							src="/images/logo.png"
							layout="responsive"
							width={200}
							height={80}
							alt="Cloversy.id logo"
						/>
					</LogoContainer>
					<InformationText color="error">Access denied!</InformationText>
					<Button onClick={() => logout({ returnTo: "http://localhost:3001" })}>Logout</Button>
				</AuthActionsContainer>
			)}
		</>
	);
};

export default AuthActions;
