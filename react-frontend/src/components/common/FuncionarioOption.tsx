import { WrapItem } from "@chakra-ui/react";
import React from "react";
import { FuncionarioModel } from "@/../../websocket_2/src/domain/model/funcionario";
import { useSelector } from "react-redux";
import { FuncionarioAvatar } from "./FuncionarioAvatar";

interface IProps extends FuncionarioModel {
	sendToWS: (data: [string, any]) => void;
}

export const FuncionarioOption: React.FC<IProps> = (props) => {
	const { sendToWS, id } = props;
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
			<FuncionarioAvatar
				isSelected={isSelected}
				onClick={onClick}
				{...props}
				isDisponible={props.disponible}
			/>
		</WrapItem>
	);
};
