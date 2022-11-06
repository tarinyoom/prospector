import { GetHash } from "./utils/hashing";
import byteLore from "./rules/placeLore.json";

export async function handleDig(guild_id: string, channel_id: string) : Promise<string> {
	return "Found: " + await stringifyName(GetFullName(channel_id, "test", byteLore));
}

async function GetFullName(id: string, type: string, lore: LoreByteLookup) : Promise<FullName> {
	const hash = GetHash([id], type);

	const nounVal = parseInt(await (await hash).substring(2 * lore.startByte, 2 * lore.endByte), 16);

	const noun = lore.values.reduceRight(
		(prev : string, curr : LoreNameValues) => curr.n > nounVal ? curr.value : prev, 
		"The Unknowable Void");

	return {
		base: {
			noun: noun
		}
	}
}

async function stringifyName(name: Promise<FullName>) : Promise<string> {
	return (await name).base.noun; // TODO fill this out
}
