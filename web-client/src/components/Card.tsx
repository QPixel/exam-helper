import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { ColorProps } from "@chakra-ui/styled-system";
import { ChakraProps } from "@chakra-ui/system";

interface CardProps {
	children?: ReactNode;
	color?: ColorProps["color"];
	outline?: boolean;
	sx?: ChakraProps["sx"];
	padding?: number;
}


const Card: React.FC<CardProps> = ({ children, outline, color = "white", sx, padding }) => (
	<Flex p={padding ? padding : 5} bg={color} w="full" alignItems="center" justifyContent="center" outline={outline ? "2px solid black" : "0px tranparent white"} sx={sx}>
		<Box mx="auto" px={8} py={4} maxW="2x1">
			{children}
		</Box>
	</Flex>
);

export default Card;