import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionarioOption } from "./FuncionarioOption";
import { FuncionarioModel } from "@/../../websocket_2/src/domain/model/funcionario";
import * as myAccountReducer from "@/store/slices/my-account";

interface IProps {
	sendDataToServer: (data: [string, any]) => void;
}

export const TablePersons: React.FC<IProps> = ({ sendDataToServer }) => {
	const dispatch = useDispatch();

	const { online, myAccount } = useSelector((state: any) => state);

	const [open] = useState(true);

	const sizes = ["full", "lg", "md", "sm", "xl"];

	const onClickNextEscene = () => {
		dispatch(myAccountReducer.setChannel(1));
	};

	return (
		<Modal
			isOpen={open}
			onClose={() => {}}
			size={sizes}
			scrollBehavior="inside"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">Selecciona un congresista</ModalHeader>
				<ModalBody>
					<Wrap className="animate__animated animate__fadeIn">
						{online.list.map((funcionario: FuncionarioModel) => (
							<FuncionarioOption
								key={funcionario.id}
								{...funcionario}
								sendToWS={sendDataToServer}
							/>
						))}
					</Wrap>
					<div
						style={{
							height: "100px",
						}}
					/>
					<div
						style={{
							background:
								"linear-gradient(0deg, rgba(255,255,255,1) 4%, rgba(255,255,255,-0.528952) 77%)",
							height: "100px",
							position: "absolute",
							bottom: 0,
							left: "0",
							width: "calc(100% - 20px)",
						}}
					/>
				</ModalBody>
				{myAccount.funcionarioId && (
					<ModalFooter className="animate__animated animate__fadeIn">
						<Button colorScheme="teal" size="md" onClick={onClickNextEscene}>
							Continuar
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};
