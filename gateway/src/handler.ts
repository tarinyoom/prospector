/**
 * Layer between Discord-formatted JSON objects and game logic. 
 */

import { InteractionResponseType, InteractionResponseFlags, InteractionType } from 'discord-interactions';
import { handleDig } from './game/dig';
import { handlePoke } from './game/poke';

export async function handleInteraction(interaction: InteractionRequest) : Promise<Object> {

	if (interaction.type == InteractionType.PING) {
		return { 
			type: InteractionResponseType.PONG
		};
	}

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

	return {
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": responseMsg,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	};
}
