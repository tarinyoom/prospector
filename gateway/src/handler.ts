export { handleInteraction as handleInteraction };

import { getJSONResponse } from "./utils";
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { handleDig } from './game/dig';
import { handlePoke } from './game/poke';

async function handleInteraction(interaction: InteractionRequest) : Promise<Response> {

	// TODO: augment this to handle more than just a one-string response
	let responseMsg: string = "No response.";
	
	switch (interaction.data.name) {
		case "dig":
			responseMsg = await handleDig(interaction.guild_id, interaction.channel_id);
			break;
		case "poke":
			responseMsg = await handlePoke();
			break;
		default:
			responseMsg = await handleDig(interaction.guild_id, interaction.channel_id);
			break;
	}

	return getJSONResponse({
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": responseMsg,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	});
}
