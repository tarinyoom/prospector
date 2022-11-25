export async function error() : Promise<GameResponse> {
	return {
		userId: "",
		msg: "Error handling your request.",
		buttons: [],
		playerData: null
	}
}
