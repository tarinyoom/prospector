import { getTraits } from "./utils/naming";
import CONSTANTS from "./utils/constants.json";
import PERSON_LORE from "./rules/personLore.json";
const PEOPLE = PERSON_LORE as LoreEntry[];

export async function stats(request: GameRequest) : Promise<GameResponse> {

	const name = await getTraits([request.userId], PEOPLE);

	return {
		userId: request.userId,
		blockMsg: {
			heading: "My stats:",
			contents: [{
				key: "level",
				value: request.playerData.level.toString()
			}].concat(name.map((trait: Trait) => {
				if (trait.value && request.playerData.level >= trait.value.requiredLevel) {
					return {
						key: trait.symbolType,
						value: trait.value?.name
					}	
				} else {
					return {
						key: trait.symbolType,
						value: CONSTANTS.UNKNOWN_SYMBOL
					}
				}
			}))
		},
		"buttons": [],
		"playerData": null
	}
}
