// Dependencies

// Hooks

// Action

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
	return (
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	);
};

export default AppWrapper;
