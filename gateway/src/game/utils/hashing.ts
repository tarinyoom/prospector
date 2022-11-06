import { sha256 } from 'crypto-hash';

export async function GetHash(ids: string[], type: string) : Promise<string> {
	return sha256(ids[0] + "test"); // TODO change this to create a composite hash for all elements of ids
}
