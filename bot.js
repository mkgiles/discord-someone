var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client();
bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(`${bot.user.username}`);
});
bot.on('message', msg => {
    const channel = msg.channel;
    if (msg.mentions.users.first() === bot.user){
        // Get members from guild.
        const members = channel.guild.members.array();
        const rnd = Math.random();
        // Select member from guild at random
        const member = members[Math.floor(members.length*rnd)].user;
        // Mention selected member
        channel.send(`${member}`).catch(logger.error);}
});
bot.login(auth.token).catch(logger.error);
