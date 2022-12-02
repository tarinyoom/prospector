import { getHash } from "./hashing";

/**
 * Builds the name of an entity from a passed hash string value. The passed
 * hash string value can be from any source, as long as the corresponding
 * LoreEntry is appropriately formatted.
 * 
 * @param ids List of traits to be hashed
 * @param entry An array description of the naming scheme
 * @returns An array object representing the traits associated with the inputs
 */
export async function getTraits(ids: string[], entries: LoreEntry[], key: string): Promise<Trait[]>{
	
	const hash : string = await getHash(ids, key);

	return entries.map((entry: LoreEntry) => {

		const n = parseInt(hash.substring(2 * entry.startByte, 2 * entry.endByte), 16);

		const value: TraitValue | null = entry.values.reduceRight(
			(prev : TraitValue | null, curr : { n: number, value: TraitValue}) => curr.n > n ? curr.value : prev, 
			null);

		return {
			symbolType: entry.symbolType,
			value: value
		}

	});
}
