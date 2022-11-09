/**
 * Layer between http requests and Discord-formatted JSON objects.
 */

import { verifyKey } from "discord-interactions";
import { handleInteraction } from "./handler";

export interface Env {
	PUBLIC_KEY: string
} 

async function getResponseJSON(request: Request) : Promise<Response> {
	return request.json<InteractionRequest>().then(async (interaction) => {
		const json = JSON.stringify(await handleInteraction(interaction), null, 2);
		return new Response(json, {
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			}
		});
	});
}

export default {
	async fetch(
		request: Request,
		env: Env
	): Promise<Response> {
		const signature = request.headers.get('X-Signature-Ed25519');
		const timestamp = request.headers.get('X-Signature-Timestamp');

		return request.clone().arrayBuffer().then((body) => {
			if (signature != null && timestamp != null) {
				const verified = verifyKey(body, signature, timestamp, env.PUBLIC_KEY);
				if (verified) {
					return getResponseJSON(request);
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
