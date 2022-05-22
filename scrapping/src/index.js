const scrapeIt = require("scrape-it");
const fs = require("fs");

const URL = "https://www.congreso.gob.pe/pleno/congresistas";

async function scrapeItExample() {
	const scrapeResult = await scrapeIt(URL, {
		grupo_parlamentario: {
			listItem: ".congresistas .partidolist",
		},
		congresistas: {
			listItem: "tr",
			data: {
				nombre: ".conginfo",
				partido: ".partidolist",
				foto: {
					selector: ".fotolist img",
					attr: "src",
					// add host to url
					convert: (url) => `https://www.congreso.gob.pe${url}`,
				},
				email: ":nth-child(4) a",
			},
		},
	});
	const { data } = scrapeResult;

	const grupoParlamentarioUnicos = [...new Set(data.grupo_parlamentario)];

	const newData = {
		grupo_parlamentario: grupoParlamentarioUnicos,
		congresistas: data.congresistas,
	}
	
	await fs.writeFile("./src/congresistas.json", JSON.stringify(newData), (err) => {
		if (err) throw err;
		console.log("The file has been saved!");
	});
}

(async () => {
	await scrapeItExample();
})();
