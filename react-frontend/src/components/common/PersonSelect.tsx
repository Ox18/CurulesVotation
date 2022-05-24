import { Avatar, WrapItem } from "@chakra-ui/react";
import React from "react";

interface IProps {
	nombre: string;
	foto: string;
	partido: string;
	email: string;
}

export const PersonSelect: React.FC<IProps> = ({
	nombre,
	foto,
	partido,
	email,
}) => {
	return (
		<WrapItem>
			<Avatar
				size="xl"
				name={nombre}
				src={foto}
				cursor="pointer"
				transition={["all", "0.3s", "ease-in-out"]}
				// effect on hover
				_hover={{
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
					transform: "scale(1.05)",
					transition: "all 0.3s ease-in-out",
				}}
				title={`${nombre} - ${partido}`}
			/>
		</WrapItem>
	);
};
