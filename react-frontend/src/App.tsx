import { TablePersons } from "@/components/common/TablePersons";

function App() {
	const ws = new WebSocket("ws://localhost:8080");

	const sendToWS = (data: any) => {
		ws.send(JSON.stringify(data));
	};

	ws.onopen = (e: any) => {
		sendToWS([
			"get-all-online",
			{
				dato: "dato",
			},
		]);
	};

	ws.onmessage = function (event: any) {
		const json = JSON.parse(event.data);
		console.log(json);
	};

	return (
		<div className="App">
			<TablePersons />
		</div>
	);
}

export default App;
