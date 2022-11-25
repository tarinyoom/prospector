interface TraitValue {
	name: string,
	requiredLevel: number
}

interface LoreChoice {
	n: number,
	value: TraitValue
}

interface LoreEntry {
	symbolType: string,
	startByte: number,
	endByte: number,
	values: LoreChoice[]
}

interface Trait {
	symbolType: string,
	value: TraitValue | null
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
		value?: string
	}[]
}

interface GameRequest {
	action: string,
	param?: string,
	userId: string,
	channelId: string,
	guildId?: string,
	playerData: PlayerData
}

interface PlayerData {
	level: number
	activated: string[]
}
