/**
 * Layer between Discord-formatted JSON objects and game logic. Also handles database access.
 */

import { InteractionResponseType, InteractionResponseFlags, InteractionType } from 'discord-interactions';
import { GetUserData, SetUserData } from './data';
import { dig } from './game/dig';
import { error } from './game/error';
import { poke } from './game/poke';

const BACKEND_API = new Map<string, (request: GameRequest) => Promise<GameResponse>>([
	["dig", dig],
	["poke", poke]
])

async function runGame(request: GameRequest) : Promise<GameResponse> {
	const backendFunction = BACKEND_API.get(request.action);

	if (backendFunction) {
		return await backendFunction(request);
	} else {
		return await error();	
	}
}

async function buildGameRequest(interaction: InteractionRequest, userState: KVNamespace) : Promise<GameRequest> {

	let action = interaction.data?.name;
	let param;

	if (action === undefined) {
		const customId = interaction.data?.custom_id;
		if (customId != undefined) {
			const interactionCommand = customId.split(';');
			action = interactionCommand[0];
			param = interactionCommand[1];
		}
	}

	const userId = interaction.user?.id ?? interaction.member?.user?.id;
	const userData = await GetUserData(userState, userId);

	return {
		action: action ?? "error",
		param: param,
		userId: userId ?? "no user found",
		userData: userData,
		channelId: interaction.channel_id ?? "error",
		guildId: interaction.guild_id
	}	
}

async function processGameResponse(gameResponse: GameResponse, userState: KVNamespace) : Promise<Object> {

	if (gameResponse.userData) {
		SetUserData(userState, "3", gameResponse.userData);
	}

	const buttons = gameResponse.buttons.map((button: {text: string, stage: string}) => {
		return {
			"type": 2,
			"label": button.text,
			"style": 1,
			"custom_id": button.stage
		}		
	})

	const components = buttons.length == 0 ? [] : 
		[{
			"type": 1,
			"components": buttons
		}];

	return {
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": gameResponse.msg,
			"components": components,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	};
}

export async function handleInteraction(interaction: InteractionRequest, userState: KVNamespace) : Promise<Object> {

	if (interaction.type == InteractionType.PING) {
		return { 
			type: InteractionResponseType.PONG
		};
	}

	return buildGameRequest(interaction, userState)
		.then(runGame)
		.then((value: GameResponse) => processGameResponse(value, userState));
}
