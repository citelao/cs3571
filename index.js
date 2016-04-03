// @flow

import NeedlemanWunsch from "./src/NW/NeedlemanWunsch";
import SmithWaterman from "./src/SW/SmithWaterman";
import Overhang from "./src/Overhang/Overhang";

console.log("Starting!");

// let nw: NeedlemanWunsch = new NeedlemanWunsch("AAAGGG", "GGGAAA", {
// 	match: 2,
// 	mismatch: -1,
// 	gapS: -3,
// 	gapT: -3
// });

// let nw: SmithWaterman = new SmithWaterman("GA", "CA", {
// 	match: 2,
// 	mismatch: -1,
// 	gapS: -2,
// 	gapT: -2
// });

let nw: Overhang = new Overhang("AAAGGG", "GGGAAA", {
	match: 2,
	mismatch: -1,
	gapS: -3,
	gapT: -3
});

console.log("Score:", nw.align());

let strs = nw.getTable().map((row) => {
	return row.map((cell) => {
		let rtn = "";
		if (cell.selected) { rtn += "<span style='background: #86a1d1'>"; }

		rtn += cell.score;

		if (cell.deltaS && cell.deltaS != "-" && cell.deltaT && cell.deltaT != "-") {
			rtn += "↖";
		} else if(cell.deltaS && cell.deltaS != "-") {
			rtn += "↑";
		} else if(cell.deltaT && cell.deltaT != "-") {
			rtn += "←";
		} else {
			rtn += "?";
		}

		if(cell.deltaS || cell.deltaT) {
			rtn += "<br />" + cell.deltaS + ", " + cell.deltaT;
		}
		if (cell.selected) { rtn += "</span>"; }
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