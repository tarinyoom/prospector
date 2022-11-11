import { GetHash } from "./utils/hashing";
import placeLore from "./rules/placeLore.json";
import { getNameObject } from "./utils/naming";
const lore = placeLore as LoreEntry;

/**
 * Top level dig function.
 * @param guild_id The ID of the guild being dug in
 * @param channel_id The ID of the channel being dug in
 * @returns a string response
 */
export async function dig(request: GameRequest) : Promise<GameResponse> {

	const name = request.guildId != undefined ?
		await getPlaceName(request.guildId, request.channelId) : null;
	const nameString = stringifyName(name);

	let userData = request.userData;
	if (nameString) {
		if (!userData) {
			userData = {
				discovered: []
			}
		}
		userData?.discovered.push(nameString);
	}

	if (request.param) {

		let msg;
		if (name?.children[0] != null) {
			msg = `Perhaps you could bring a ${name.children[0].value} person to this ${nameString}...`;

		} else {
			msg = `There isn't anything remarkable here, it seems.`;
		}
		return {
			userId: request.userId,
			"msg": msg,
			"buttons": [],
			"userData": userData
		};
	} else {

		let msg;
		if (name === null || name.value === null) {
			msg = `You dig, and find nothing interesting...`;
		} else {
			msg = `You dig, and find a ${nameString}!`;
		}
		return {
			userId: request.userId,
			"msg": msg,
			"buttons": [
				{
					"text": "Ponder",
					"stage": `dig;followup`
				}
			],
			userData: userData
		};
	}
}

async function getPlaceName(guild_id: string, channel_id: string) : Promise<Name> {
	const hash : string = (await GetHash([channel_id]))[0];
	const name : Name = getNameObject(hash, lore);
	return name;
}

/**
 * Converts A Name object into a string to be displayed to the user. 
 * @param name The javascript object representing the full name of an entity
 * @returns A string representation of that name
 */
// TODO: move this to naming.ts with a shared logic for stringifying names in general
export function stringifyName(name: Name | null) : string | null {

	if (name === null) {
		return null;
	} else if (name.value === null) {
		return "nothing interesting";
	} else if (name.children[0].value === null) {
		return `${name.value}`;
	} else {
		return `${name.children[0].value} ${name.value}`;
	}
}
