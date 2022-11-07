import { GetHash } from "./utils/hashing";
import placeLore from "./rules/placeLore.json";
const lore = placeLore as LoreByteLookup;

export async function handleDig(guild_id: string, channel_id: string) : Promise<string> {
	return "Found: " + await stringifyName(GetFullName(channel_id, "test", lore));
}

async function GetFullName(id: string, type: string, lore: LoreByteLookup) : Promise<PlaceName> {
	const hash = (await GetHash([id]))[0];

	const nounVal = parseInt(await (await hash).substring(2 * lore.startByte, 2 * lore.endByte), 16);

	const noun = lore.values.reduceRight(
		(prev : string, curr : LoreNameValues) => curr.n > nounVal ? curr.value : prev, 
		"The Unknowable Void");

	return {
		noun: noun,
		adjectives: []
	}
}

async function stringifyName(name: Promise<PlaceName>) : Promise<string> {
	return (await name).noun; // TODO fill this out
}
