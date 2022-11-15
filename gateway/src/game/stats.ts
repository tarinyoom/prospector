import { getPersonName } from "./utils/naming";
import personLore from "./rules/personLore.json";
const lore = personLore as LoreEntry;

export async function stats(request: GameRequest) : Promise<GameResponse> {

	const name = await getPersonName(request.userId, lore);
	return {
		userId: request.userId,
		blockMsg: {
			heading: "My stats:",
			contents: [
				{
					key: "Level",
					value: request.playerData.level.toString()
				},
				{
					key: "Element",
					value: name.children[0].value
				}
			]
		},
		"buttons": [],
		"playerData": null
	}
}
