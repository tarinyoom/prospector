interface InteractionRequest {
    "type": number,
    "token": string,
    "member": {
        "user": {
            "id": string,
            "username": string,
            "avatar": string,
            "discriminator": string,
            "public_flags": number
        },
        "roles": string[],
        "premium_since": string,
        "permissions": string,
        "pending": boolean,
        "nick": string,
        "mute": boolean,
        "joined_at": string,
        "is_pending": boolean,
        "deaf": boolean
    },
    "id": string,
    "guild_id": string,
    "app_permissions": string,
    "guild_locale": string,
    "locale": string,
    "data": {
        "options": {
            "type": number,
            "name": string,
            "value": string
        }[],
        "type": number,
        "name": string,
        "id": string
    },
    "channel_id": string
}
