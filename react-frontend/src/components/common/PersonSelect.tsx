import { Avatar, WrapItem } from "@chakra-ui/react";
import React from "react";
import { CongresistaModel } from "../../../../websocket/src/domain/models/congresista";

import { sendToWS } from "@/ws";

export const PersonSelect: React.FC<CongresistaModel> = ({
	nombre,
	foto,
	partido,
	online,
	id,
}) => {
	const onClick = () => {
		sendToWS([
			"select-online",
			{
				id,
			},
		]);
	};

	return (
		<WrapItem>
			<Avatar
				onClick={onClick}
				size="xl"
				name={nombre}
				src={foto}
				cursor="pointer"
				transition={["all", "0.3s", "ease-in-out"]}
				filter={online ? "grayscale(100%)" : "grayscale(0%)"}
				_hover={
					online
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
