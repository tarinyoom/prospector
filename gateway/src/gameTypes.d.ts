interface LoreNameValues {
	value: string,
	n: number, // integers less than n will map to "value"
}

interface LoreByteLookup {
	symbolType: string,
	startByte: number,
	endByte: number,
	requires: string?,
	values: LoreNameValues[]
}

interface ByteLore {
		[key: string]: LoreByteLookup[]
}[]

interface Name {
    noun: string,
    adjectives?: string[]
}

interface FullName {
    base: Name,
    epithet?: Name
}
