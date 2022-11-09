type Snowflake = string;

interface InteractionData {
    id: Snowflake,
    name: string,
    custom_id?: string
}

interface InteractionRequest {
    id: Snowflake,
    channel_id?: Snowflake,
    guild_id?: Snowflake,
    type: number,
    data?: InteractionData,
}
