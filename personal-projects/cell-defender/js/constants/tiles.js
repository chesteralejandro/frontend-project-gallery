export const TILES_CODES = {
	NONE: 0,
	WALL: 1,
	PILL: 8,
};

export const TILES_ELEMENTS = {
	[TILES_CODES.NONE]: '<article class="tiles none">&nbsp;</article>',
	[TILES_CODES.WALL]: '<article class="tiles wall">&nbsp;</article>',
	[TILES_CODES.PILL]: '<article class="tiles pill">&nbsp;</article>',
};
