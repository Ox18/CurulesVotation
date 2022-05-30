import { Avatar, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FuncionarioModel } from "@/../../websocket_2/src/domain/model/funcionario";
import { useSelector } from "react-redux";

interface IProps extends FuncionarioModel {
	sendToWS: (data: [string, any]) => void;
}

export const FuncionarioOption: React.FC<IProps> = ({
	nombre,
	foto,
	partido,
	disponible,
	id,
	sendToWS,
}) => {
	const { funcionarioId } = useSelector((state: any) => state.myAccount);

	const onClick = () => {
		sendToWS([
			"select-funcionario",
			{
				id,
			},
		]);
	};

	const isSelected = funcionarioId === id;

	return (
		<WrapItem>
			<Avatar
				onClick={onClick}
				size="xl"
				name={nombre}
				src={foto}
				cursor="pointer"
				transition={["all", "0.3s", "ease-in-out"]}
				filter={
					isSelected ? "" : !disponible ? "grayscale(100%)" : "grayscale(0%)"
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
		</WrapItem>
	);
};
