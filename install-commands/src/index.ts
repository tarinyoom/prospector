import axios from 'axios';
import commands from './commands.json';
import secrets from './secrets.json';

const testUrl = `https://discord.com/api/v10/applications/${secrets.APPLICATION_ID}/guilds/${secrets.TEST_GUILD_ID}/commands`
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bot ${secrets.BOT_TOKEN}`
}

commands.command_list.forEach(command => {
  axios.post(testUrl, command, {headers: headers
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
});
