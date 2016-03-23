// @flow

export type NWAlignment = {
	score: number;
	s: string;
	t: string;
};

export type NWChars = {
	s: string;
	t: string;
};

export type NWIndex = {
	i: number;
	j: number;
};

export type NWEntry = {
	score: number;
	previous: ?NWEntry;
	deltaS: string;
	deltaT: string;
};

export type NWScores = {
	match: number;
	mismatch: number;
	gapS: number;
	gapT: number;
};