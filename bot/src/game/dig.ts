import { getTraits } from "./utils/naming";
import PLACE_LORE from "./rules/placeLore.json";
import PERSON_LORE from "./rules/personLore.json";
const PLACES = PLACE_LORE as LoreEntry[];
const PEOPLE = PERSON_LORE as LoreEntry[];

/**
 * Top level dig function.
 * @param guild_id The ID of the guild being dug in
 * @param channel_id The ID of the channel being dug in
 * @returns a string response
 */
export async function dig(request: GameRequest) : Promise<GameResponse> {

	const place = request.guildId != undefined ?
		await getTraits([request.channelId, request.guildId], PLACES) : null;
	const person = await getTraits([request.userId], PEOPLE);

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
					msg = `FOLLOWUP BROKEN`;
					break;
			}
		}
	} else {
		if (place === null) {
			msg = `You dig, and find nothing interesting...`;
		} else {
			console.log(`player activated is ${JSON.stringify(request.playerData)}`);
			const activated = request.playerData.activated.includes(request.channelId);
			msg = `You dig, and find a${activated ? "n activated" : ""} ${placeString}!`;
			if (true) {
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

/**
 * Converts A Name object into a string to be displayed to the user. 
 * @param name The javascript object representing the full name of an entity
 * @returns A string representation of that name
 */
// TODO: move this to naming.ts with a shared logic for stringifying names in general
export function stringifyName(traits: Trait[] | null) : string | null {
	if (traits) {
		return traits.map((trait: Trait) => {
			return trait.value?.name;
		}).reverse().join(" ");
	} else {
		return null;
	}
}
