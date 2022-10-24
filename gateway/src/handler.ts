export { handleInteraction };

import { getJSONResponse } from "./utils";
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';

async function handleInteraction(interaction: Interaction) : Promise<Response> {
	return getJSONResponse({
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": `Responding to ${interaction.data.name}.`,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	});
}
