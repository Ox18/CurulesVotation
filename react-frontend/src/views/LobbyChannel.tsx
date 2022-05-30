import { TablePersons } from "@/components/common";
import React from "react";

export const LobbyChannel = (props: any) => {
	return (
		<div className="animate__animated animate__fadeIn">
			<TablePersons {...props} />
		</div>
	);
};
