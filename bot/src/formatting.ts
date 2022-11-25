export function formatBlock(data: BlockData) : string {

	const heading = data.heading;
	const contents = data.contents.map((pair) => `${pair.key}: ${pair.value}`);

	return `\`\`\`${heading}\n${contents.join('\n')}\`\`\``
}
