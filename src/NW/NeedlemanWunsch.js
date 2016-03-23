// @flow

import { NWEntry, NWScores, NWIndex, NWChars, NWAlignment } from "./Types";

class NeedlemanWunsch {
	_s: Array<string>;
	_t: Array<string>;
	_scores: NWScores;

	_table: Array<Array<NWEntry>>;

	constructor(s: string, t: string, scores: NWScores) {
		console.log("NeedlemanWunsch!");

		this._s = s.split("");
		this._t = t.split("");
		this._scores = scores;
		this._table = new Array(s.length + 1);
		for(let i = 0; i < s.length + 1; i++) {
			this._table[i] = new Array(t.length + 1);
		}
	}

	getTable(): Array<Array<NWEntry>> {
		return this._table;
	}

	align(): NWAlignment {
		let queue: Array<NWIndex> = [{ i: 0, j: 0 }];

		while(queue.length > 0) {
			let shift = queue.shift();

			let i = (shift.i >= 1) ?
				this._table[shift.i - 1][shift.j] :
				null;

			let ij = (shift.i >= 1 && shift.j >= 1) ?
				this._table[shift.i - 1][shift.j - 1] :
				null;

			let j = (shift.j >= 1) ?
				this._table[shift.i][shift.j - 1] :
				null;

			this._table[shift.i][shift.j] = this._score(
				{ s: this._s[shift.i - 1], t: this._t[shift.j - 1] },
				i,
				ij,
				j);

			if(shift.i < this._s.length) {
				queue.push({ i: shift.i + 1, j: shift.j });
			} else if(shift.j < this._t.length) {
				queue.push({ i: 0, j: shift.j + 1 });
			}
		}

		// console.table(this._table);

		let current = this._table[this._s.length][this._t.length];
		let score = current.score;
		let s = "";
		let t = "";

		while(current != null) {
			s = current.deltaS + s;
			t = current.deltaT + t;

			current = current.previous;
		}

		return {
			score: score,
			s: s,
			t: t
		};
	}

	_score(chars: NWChars, i: ?NWEntry, ij: ?NWEntry, j: ?NWEntry): NWEntry {
		// Base cases
		if(i == null && j == null) {
			return {
				score: 0,
				previous: null,
				deltaS: "",
				deltaT: ""
			};
		}

		if(j == null) {
			if(i == null) { throw "this is not physically possible"; }

			return {
				score: i.score + this._scores.gapT,
				previous: i,
				deltaS: chars.s,
				deltaT: "-"
			};
		}

		if(i == null) {
			return {
				score: j.score + this._scores.gapS,
				previous: j,
				deltaS: "-",
				deltaT: chars.t
			};
		}

		if(ij == null) { throw "this is not possible"; }

		// Actual scoring
		let results: Array<NWEntry> = [];

		// Match or mismatch?
		if(chars.s == chars.t) {
			results.push({
				score: ij.score + this._scores.match,
				previous: ij,
				deltaS: chars.s,
				deltaT: chars.t
			});
		} else {
			results.push({
				score: ij.score + this._scores.mismatch,
				previous: ij,
				deltaS: chars.s,
				deltaT: chars.t
			});
		}

		// T gap
		results.push({
			score: i.score + this._scores.gapT,
			previous: i,
			deltaS: chars.s,
			deltaT: "-"
		});

		// S gap
		results.push({
			score: j.score + this._scores.gapS,
			previous: j,
			deltaS: "-",
			deltaT: chars.t
		});

		results.sort((a: NWEntry, b: NWEntry) => {
			return b.score - a.score;
		});

		// console.log(chars);
		// console.log(results);

		return results[0];
	}
}
export default NeedlemanWunsch;