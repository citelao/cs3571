// @flow

import NeedlemanWunsch from "./src/NW/NeedlemanWunsch";

console.log("Starting!");

let nw: NeedlemanWunsch = new NeedlemanWunsch("GCATGCU", "GATTACA", {
	match: 1,
	mismatch: -1,
	gapS: -1,
	gapT: -1
});

console.log("Score:", nw.align());

let strs = nw.getTable().map((row) => {
	return row.map((cell) => {
		let rtn = "" + cell.score;

		if(cell.deltaS || cell.deltaT) {
			rtn += "<br />" + cell.deltaS + ", " + cell.deltaT;
		}

		return rtn;
	});
});

let tbl = generateTable(strs, document);
document.body.appendChild(tbl);

function generateTable(strs: Array<Array<string>>, doc: Document): HTMLElement {
	let table = document.createElement("table");
	table.style.textAlign = "center";

	let tbody = document.createElement("tbody");

	strs.forEach((row) => {
		let trow = document.createElement("tr");

		row.forEach((cell) => {
			let tcell = document.createElement("td");
			tcell.style.padding = "0.5rem";
			tcell.style.border = "1px solid";

			tcell.innerHTML = cell;
			trow.appendChild(tcell);
		})

		tbody.appendChild(trow);
	});

	table.appendChild(tbody);
	return table;
}