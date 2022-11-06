import { sha256 } from 'crypto-hash';

export async function GetHash(ids: string[]) : Promise<string[]> {
	return Promise.all(ids.map(async (id) => {
		return sha256(id + "test"); // TODO change this to an unguessable secret
	}));
}
