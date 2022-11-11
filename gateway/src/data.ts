const USE_STATE: boolean = false;

export async function GetUserData(database: KVNamespace, userId: string | undefined) : Promise<UserData> {
	if (userId && USE_STATE) {
		const userDataString = await database.get(userId);
		if (userDataString) {
			const userData: UserData = JSON.parse(await userDataString);
			return userData;
		}
	}

	return {
		discovered: []
	}
}

export async function SetUserData(database: KVNamespace, userId: string, data: UserData) {
	if (USE_STATE) {
		console.log(`adding ${JSON.stringify(data)}`);
		return await database.put(userId, JSON.stringify(data));
	}
}
