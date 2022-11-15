import { getHash } from "./utils/hashing";
import { getPlaceName, getPersonName } from "./utils/naming";
import placeLore from "./rules/placeLore.json";
import personLore from "./rules/personLore.json";
const places = placeLore as LoreEntry;
const people = personLore as LoreEntry;

/**
 * Top level dig function.
 * @param guild_id The ID of the guild being dug in
 * @param channel_id The ID of the channel being dug in
 * @returns a string response
 */
export async function dig(request: GameRequest) : Promise<GameResponse> {

	const place = request.guildId != undefined ?
		await getPlaceName(request.guildId, request.channelId, places) : null;
	const person = await getPersonName(request.userId, people);

	const placeString = stringifyName(place);

	let playerData = request.playerData;
	let msg: string = "";
	let buttons: {text: string, stage: string}[] = [];

	if (request.param) {

		if (place != null) {
			switch (request.param) {
				case "activate":
					msg = `You activate the ${placeString}. You level up!`;
					playerData.level += 1;
					playerData.activated.push(request.channelId);
					break;
				case "followup":
					msg = `Perhaps you could bring a ${place.children[0].value} person to this ${placeString}...`;
					break;
			}
		}
	} else {
		if (place === null || place.value === null) {
			msg = `You dig, and find nothing interesting...`;
		} else {
			console.log(`player activated is ${JSON.stringify(request.playerData)}`);
			const activated = request.playerData.activated.includes(request.channelId);
			msg = `You dig, and find a${activated ? "n activated" : ""} ${placeString}!`;
			if (!activated && matchElement(place, person)) {
				buttons = [
					{
						text: "Activate",
						stage: "dig;activate"
					}
				]
			} else if (!activated) {
				buttons = [
					{
						text: "Ponder",
						stage: "dig;followup"
					}
				]
			}
		}
	}

	return {
		userId: request.userId,
		msg: msg,
		buttons: buttons,
		playerData: playerData
	};
}

function matchElement(place: PlaceName, person: Name) {
	return place.children[0].value == person.children[0].value;
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
