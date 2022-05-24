import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PersonSelect } from "./PersonSelect";
import { CongresistaModel } from "../../../../websocket/src/domain/models/congresista";

export const TablePersons = () => {
	const congresistas = useSelector((state: any) => state.online.list);

	const [open] = useState(true);

	const sizes = ["full", "lg", "md", "sm", "xl"];

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
					<Wrap>
						{congresistas.map((congresista: CongresistaModel) => (
							<PersonSelect key={congresista.id} {...congresista} />
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
			</ModalContent>
		</Modal>
	);
};
