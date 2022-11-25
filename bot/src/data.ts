function buildBlankPlayerProfile() {
	return {
		level: 1,
		activated: []
	}
}

export async function getUserData(database: KVNamespace | null, userId: string | undefined) : Promise<PlayerData> {
	if (database && userId) {
		const userDataString = await database.get(userId);
		if (userDataString) {
			const userData: PlayerData = JSON.parse(await userDataString);
			return userData;
		}
	}

	return buildBlankPlayerProfile();
}

export async function setUserData(database: KVNamespace | null, userId: string, data: PlayerData | null) {
	if (database && data) {
		return await database.put(userId, JSON.stringify(data));
	}
}
