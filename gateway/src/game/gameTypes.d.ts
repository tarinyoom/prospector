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

interface PlaceName extends Name {
	symbolType: "base",
	value: string,
	children: [
		{
			symbolType: "adjective",
			value: string,
			children: []
		}
	]
}

interface PersonName extends Name {
	symbolType: "base",
	value: string,
	children: [
		{
			symbolType: "adjective",
			value: string,
			children: []
		}
	]
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
	playerData: PlayerData
}

interface PlayerData {
	level: number
	activated: string[]
}
