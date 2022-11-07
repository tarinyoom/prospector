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
export async function handleDig(guild_id: string, channel_id: string) : Promise<string> {
	const hash : string = (await GetHash([channel_id]))[0];
	const name : Name = getNameObject(hash, lore);
	return "Found: " + stringifyName(name);
}

/**
 * Converts A Name object into a string to be displayed to the user. 
 * @param name The javascript object representing the full name of an entity
 * @returns A string representation of that name
 */
// TODO: move this to naming.ts with a shared logic for stringifying names in general
export function stringifyName(name: Name) : string {

	console.log(JSON.stringify(name));
	if (name.value === null) {
		return "nothing interesting";
	} else if (name.children[0].value === null) {
		return name.value;
	} else {
		return `${name.children[0].value} ${name.value}`;
	}
}
