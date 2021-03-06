import React, { useEffect, useState } from "react";
import { WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FuncionarioModel } from "../../../../websocket_2/src/domain/model/funcionario";
import { FuncionarioAvatar } from "@/components/common/FuncionarioAvatar";

const limits = [
	{
		limit: 7,
		radius: 50,
		space: 18.5,
	},
	{
		limit: 20,
		radius: 80,
		space: 30,
	},
	{
		limit: 37,
		radius: 110,
		space: 10,
	},
	{
		limit: 54,
		radius: 140,
		space: 8.2,
	},
	{
		limit: 79,
		radius: 170,
		space: 5.455,
	},
	{
		limit: 100,
		radius: 200,
		space: 6.55,
	},
	{
		limit: 120,
		radius: 200,
		space: 6.9,
	},
	{
		limit: 200,
		radius: 230,
		space: 14.5,
	},
	{
		limit: 300,
		radius: 260,
		space: 6,
	},
];

const guessSpace = (index: number) => {
	for (let i = 0; i < limits.length; i++) {
		if (i === 0) {
			if (index >= 0 && index <= limits[i].limit) {
				return limits[i].space;
			}
		} else {
			if (index >= limits[i - 1].limit + 1 && index <= limits[i].limit) {
				return limits[i].space;
			}
		}
	}
	return 0;
};

const guessMyProp = (index: number, type: string = "") => {
	for (let i = 0; i < limits.length; i++) {
		if (i === 0) {
			if (index >= 0 && index <= limits[i].limit) {
				if (type === "space") {
					return limits[i].space;
				} else if (type === "index") {
					return index;
				} else if (type === "radius") {
					return limits[i].radius;
				}
			}
		} else {
			if (index >= limits[i - 1].limit + 1 && index <= limits[i].limit) {
				if (type === "space") {
					return limits[i].space;
				} else if (type === "index") {
					return index - (limits[i - 1].limit + 1);
				} else if (type === "radius") {
					return limits[i].radius;
				}
			}
		}
	}
	return 0;
};

export const GrupoGurules = () => {
	const { online } = useSelector((state: any) => state);

	const [semicircle, setSemicircle] = useState({
		startAngle: 0,
		angle: 0,
		radius: 100,
		offset: 0,
	});

	const [angles, setAngles] = useState<any>([]);

	useEffect(() => {
		if (online.list) {
			const startAngle = Math.PI / Number(online.list.length),
				angle = startAngle * 2,
				radius = 100,
				offset = window.innerWidth / 2;
			setSemicircle({ startAngle, angle, radius, offset });

			let index: number = 0;
			setAngles(
				online.list.map((item: FuncionarioModel) => {
					// const my_radius =
					// 	index >= 0 && index <= 7
					// 		? 50
					// 		: index >= 8 && index <= 20
					// 		? 80
					// 		: index >= 21 && index <= 37
					// 		? 110
					// 		: index >= 37 && index <= 54
					// 		? 140
					// 		: index >= 55 && index <= 79
					// 		? 170
					// 		: index >= 80 && index <= 100
					// 		? 200
					// 		: index >= 101 && index <= 120
					// 		? 230
					// 		: 260;

					const my_radius = guessMyProp(index, "radius");

					// const my_index =
					// 	index >= 0 && index <= 7
					// 		? index
					// 		: index >= 8 && index <= 20
					// 		? index - 8
					// 		: index >= 21 && index <= 37
					// 		? index - 21
					// 		: index >= 37 && index <= 54
					// 		? index - 38
					// 		: index >= 55 && index <= 79
					// 		? index - 55
					// 		: index >= 80 && index <= 100
					// 		? index - 80
					// 		: index >= 101 && index <= 120
					// 		? index - 101
					// 		: index - 121;
					const my_index = guessMyProp(index, "index");
					// const space =
					// 	index >= 0 && index <= 7
					// 		? 18.5
					// 		: index >= 8 && index <= 20
					// 		? 13
					// 		: index >= 21 && index <= 37
					// 		? 10
					// 		: index >= 37 && index <= 54
					// 		? 8.2
					// 		: index >= 55 && index <= 79
					// 		? 5.455
					// 		: index >= 80 && index <= 100
					// 		? 6.55
					// 		: index >= 101 && index <= 120
					// 		? 6.9
					// 		: 14.5;
					const space = guessMyProp(index, "space");
					const lastAngle = startAngle * my_index * space;
					index++;
					return {
						left: my_radius * Math.cos(lastAngle) + offset + "px",
						top: my_radius * Math.sin(lastAngle) + "px",
					};
				})
			);
		}
	}, [online.list]);

	return (
		/// draw semicircles with avatars
		<div
			className="grupo-gurules-semicircle"
			style={{
				transform: "scale(2))",
			}}
		>
			{online.list.map((funcionario: FuncionarioModel, index: number) => {
				return (
					<WrapItem
						key={funcionario.id}
						style={{
							position: "absolute",
							...{
								left: angles[index]?.left || "0px",
								top: angles[index]?.top || "0px",
							},
						}}
					>
						<FuncionarioAvatar
							{...funcionario}
							size="xs"
							isDisponible={!funcionario.disponible}
						/>
					</WrapItem>
				);
			})}
		</div>
	);
};
