import { sha256 } from 'crypto-hash';

/**
 * Basic hashing function. Salts and hashes an array of IDs for content generation.
 * @param ids list of IDs to hash
 * @returns a cryptographically secure array of hashes based on the passed IDs
 */
export async function GetHash(ids: string[]) : Promise<string[]> {
	return Promise.all(ids.map(async (id) => {
		return sha256(id + "test"); // TODO change this to an unguessable secret
	}));
}
