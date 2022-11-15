/**
 * Layer between Discord-formatted JSON objects and game logic. Also handles database access.
 */

import { InteractionResponseType, InteractionResponseFlags, InteractionType } from 'discord-interactions';
import { getUserData, setUserData } from './data';
import { formatBlock } from './formatting';
import { dig } from './game/dig';
import { poke } from './game/poke';
import { stats } from './game/stats';
import { error } from './game/error';

const BACKEND_API = new Map<string, (request: GameRequest) => Promise<GameResponse>>([
	["dig", dig],
	["poke", poke],
	["stats", stats]
])

async function runGame(request: GameRequest) : Promise<GameResponse> {
	const backendFunction = BACKEND_API.get(request.action);

	if (backendFunction) {
		return await backendFunction(request);
	} else {
		return await error();	
	}
}

async function buildGameRequest(interaction: InteractionRequest, userState: KVNamespace | null) : Promise<GameRequest> {

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
	const userData = await getUserData(userState, userId);

	return {
		action: action ?? "error",
		param: param,
		userId: userId ?? "no user found",
		playerData: userData,
		channelId: interaction.channel_id ?? "error",
		guildId: interaction.guild_id
	}	
}

async function processGameResponse(gameResponse: GameResponse, userState: KVNamespace | null) : Promise<Object> {

	setUserData(userState, gameResponse.userId, gameResponse.playerData);

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

	const message = gameResponse.blockMsg ? formatBlock(gameResponse.blockMsg) : gameResponse.msg;

	return {
		"type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		"data": {
			"tts": false,
			"content": message,
			"components": components,
			"flags": InteractionResponseFlags.EPHEMERAL,
			"embeds": [],
			"allowed_mentions": { "parse": [] }
		}
	};
}

export async function handleInteraction(interaction: InteractionRequest, userState: KVNamespace | null) : Promise<Object> {

	if (interaction.type == InteractionType.PING) {
		return { 
			type: InteractionResponseType.PONG
		};
	}

	return buildGameRequest(interaction, userState)
		.then(runGame)
		.then((value: GameResponse) => processGameResponse(value, userState));
}
