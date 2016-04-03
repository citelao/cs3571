// @flow

export type Alignment = {
	score: number;
	s: string;
	t: string;
};

export type Entry = {
	score: number;
	previous: ?Entry;
	// previousDirection: 
	deltaS: string;
	deltaT: string;
	selected: boolean;
};
