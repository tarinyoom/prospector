import { getHash } from "./utils/hashing";
import { getNameObject } from "./utils/naming";
import personLore from "./rules/personLore.json";
const lore = personLore as LoreEntry;


async function getPersonName(user_id: string) : Promise<Name> {
	const hash : string = (await getHash([user_id]))[0];
	const name : Name = getNameObject(hash, lore);
	return name;
}

export async function stats(request: GameRequest) : Promise<GameResponse> {

	const name = await getPersonName(request.userId);
	return {
		userId: request.userId,
		blockMsg: {
			heading: "My stats:",
			contents: [
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
