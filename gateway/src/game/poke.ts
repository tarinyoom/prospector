
// TODO, change the type signature here (needs to take in the target string id)
export async function poke(request: GameRequest) : Promise<GameResponse> {
	return {
		"userId": request.userId,
		"msg": "this is a poke response",
		"buttons": [
			{
				"text": "just a button",
				"stage": "followup string to send on button callback"
			}
		],
		"playerData": null
	};
}
