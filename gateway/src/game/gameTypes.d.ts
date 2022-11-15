interface LoreValues {
	value: string,
	n: number
}

interface LoreEntry {
	symbolType: string,
	startByte: number,
	endByte: number,
	values: LoreNameValues[],
	children: LoreEntry[]
}

interface Name {
	symbolType: string,
	value: string,
	children: Name[]
}
