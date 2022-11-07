
/**
 * Builds the name of an entity from a passed hash string value. The passed
 * hash string value can be from any source, as long as the corresponding
 * LoreEntry is appropriately formatted.
 * 
 * @param hash The hash value to be converted to a name
 * @param entry A recursive description of the naming scheme
 * @returns An object representing the name's syntax tree
 */
export function getNameObject(hash: string, entry: LoreEntry) : Name {

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

	return name;
}
