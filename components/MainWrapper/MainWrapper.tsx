// Styles
import { OuterContainer } from "./MainWrapper.styles";

interface MainWrapperProps {
	children: React.ReactElement | React.ReactElement[];
}

const MainWrapper = ({ children }: MainWrapperProps) => {
	return <OuterContainer>{children}</OuterContainer>;
};

export default MainWrapper;
