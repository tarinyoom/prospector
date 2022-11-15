import { getHash } from "./hashing";

export async function getPersonName(user_id: string, lore: LoreEntry) : Promise<PersonName> {
	const hash : string = await getHash([user_id]);
	const name = getNameObject<PersonName>(hash, lore);
	return name;
}

export async function getPlaceName(guild_id: string, channel_id: string, lore: LoreEntry) : Promise<PlaceName> {
	const hash : string = await getHash([channel_id, guild_id]);
	const name = getNameObject<PlaceName>(hash, lore);
	return name;
}

/**
 * Builds the name of an entity from a passed hash string value. The passed
 * hash string value can be from any source, as long as the corresponding
 * LoreEntry is appropriately formatted.
 * 
 * @param hash The hash value to be converted to a name
 * @param entry A recursive description of the naming scheme
 * @returns An object representing the name's syntax tree
 */
function getNameObject<T extends Name>(hash: string, entry: LoreEntry) : T {

	const n = parseInt(hash.substring(2 * entry.startByte, 2 * entry.endByte), 16);

	const value = entry.values.reduceRight(
		(prev : string | null, curr : LoreValues) => curr.n > n ? curr.value : prev, 
		null);

	const children = value != null ? entry.children.map(
		(child: LoreEntry) => getNameObject(hash, child))
		: [];

	const name = {
		symbolType: entry.symbolType,
		value: value,
		children: children
	};

	return name as T;
}
