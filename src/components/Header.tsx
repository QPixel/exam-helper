import { Flex } from "@chakra-ui/layout";
import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavBarContainerProps {
	children: ReactNode;
	props?: any;
}

export const NavBarContainer: React.FC<NavBarContainerProps> = ({ children, props }) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={8}
			p={8}
			bg={["primary.500", "primary.500", "transparent", "transparent"]}
			color={["white", "white", "primary.700", "primary.700"]}
			{...props}
		>
			{children}
		</Flex>
	)
}

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
	return (
		<header>
			<NavBarContainer>
				<Box>
					<Text fontSize="lg" fontWeight="bold" fontFamily="sans-serif" color="white">
						Exam Helper
					</Text>
				</Box>
			</NavBarContainer>
		</header>
	);
}

export default Header;
