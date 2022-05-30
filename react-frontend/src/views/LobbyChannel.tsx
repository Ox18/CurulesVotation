import React from "react";
import { TablePersons } from "@/components/common";

export const LobbyChannel = (props: any) => {
	return (
		<div className="animate__animated animate__fadeIn">
			<TablePersons {...props} />
		</div>
	);
};
