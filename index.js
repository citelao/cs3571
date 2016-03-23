// @flow

import NeedlemanWunsch from "./src/NW/NeedlemanWunsch";

console.log("Starting!");

let nw: NeedlemanWunsch = new NeedlemanWunsch("abcde", "fffabcde", {
	match: 2,
	mismatch: -1,
	gapS: -2,
	gapT: -2
});

console.log("Score:", nw.align());

console.table(nw.getTable().map((row) => {
	return row.map((cell) => "" + cell.deltaS + ", " + cell.deltaT);
}));