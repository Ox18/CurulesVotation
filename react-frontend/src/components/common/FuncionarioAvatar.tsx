import { Avatar } from "@chakra-ui/react";
import React from "react";
import { FuncionarioModel } from "../../../../websocket_2/src/domain/model/funcionario";

interface IProps extends FuncionarioModel {
	onClick?: () => void;
	isSelected?: boolean;
	size?: string;
	showFoto?: boolean;
	isDisponible?: boolean;
	hiddeAdmin?: boolean;
}

export const FuncionarioAvatar: React.FC<IProps> = ({
	nombre,
	onClick = () => {},
	foto,
	isSelected,
	disponible = true,
	partido,
	size = "xl",
	showFoto = true,
	isDisponible = true,
	admin = false,
	hiddeAdmin = false,
}) => {
	if (hiddeAdmin && admin) {
		return null;
	}

	return (
		<Avatar
			onClick={onClick}
			size={size}
			name={nombre}
			src={showFoto ? foto : undefined}
			cursor="pointer"
			transition={["all", "0.3s", "ease-in-out"]}
			filter={
				isSelected ? "" : !isDisponible ? "grayscale(100%)" : "grayscale(0%)"
			}
			border={isSelected ? "2px solid #00bfff" : "2px solid #fff"}
			_hover={
				!disponible
					? {}
					: {
							boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
							transform: "scale(1.02)",
							transition: "all 0.3s ease-in-out",
					  }
			}
			title={`${nombre} - ${partido}`}
		/>
	);
};
