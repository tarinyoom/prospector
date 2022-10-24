import { verifyKey, InteractionType, InteractionResponseType } from "discord-interactions";
import { getJSONResponse } from "./utils";
import { handleInteraction } from "./handler";

export interface Env {
	PUBLIC_KEY: string
} 

async function evaluateVerifiedRequest(request: Request) : Promise<Response> {
	return request.json<Interaction>().then((interaction) => {
		if (interaction.type === InteractionType.PING) {
			console.log("returning pong");
			return getJSONResponse({"type": InteractionResponseType.PONG});
		}
		return handleInteraction(interaction);
	});
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const signature = request.headers.get('X-Signature-Ed25519');
		const timestamp = request.headers.get('X-Signature-Timestamp');

		return request.clone().arrayBuffer().then((body) => {
			if (signature != null && timestamp != null) {
				const verified = verifyKey(body, signature, timestamp, env.PUBLIC_KEY);
				if (verified) {
					return evaluateVerifiedRequest(request);
				}
			}
			console.error("Could not verify request");
			return new Response("Bad request signature", {"status": 401});
		}).catch((error) => {
			console.error("malformed request");
			console.error(`error: ${error}`);
			return new Response("Bad request signature", {"status": 401});
		});
	},
};
