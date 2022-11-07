interface LoreNameValues {
	value: string,
	n: number
}

interface LoreByteLookup {
	symbolType: string,
	startByte: number,
	endByte: number,
	requires: string?,
	values: LoreNameValues[]
}

interface PlaceName {
    noun: string,
	adjectives: string[]
}
