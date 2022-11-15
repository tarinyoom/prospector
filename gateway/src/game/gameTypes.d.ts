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

interface GameResponse {
	userId: string,
	msg?: string,
	blockMsg?: BlockData,
	buttons: {
		text: string,
		stage: string
	}[],
	playerData: PlayerData | null
}

interface BlockData {
	heading: string,
	contents: {
		key: string,
		value: string
	}[]
}

interface GameRequest {
	action: string,
	param?: string,
	userId: string,
	channelId: string,
	guildId?: string,
	playerData: PlayerData | null
}

interface PlayerData {
	level: number
}
