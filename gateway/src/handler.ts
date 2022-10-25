export { handleInteraction };

import { sha256 } from 'crypto-hash';
import { getJSONResponse } from "./utils";
import byteLore from "./rules/byteLore.json";
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';

async function GetHash(ids: string[], type: string) : Promise<string> {
	return sha256(ids[0] + "test"); // TODO change this to create a composite hash for all elements of ids
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

async function handleInteraction(interaction: InteractionRequest) : Promise<Response> {
	const name = await stringifyName(GetFullName(interaction.channel_id, "test", byteLore));
	return getJSONResponse({
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": `Found ${name}.`,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	});
}
