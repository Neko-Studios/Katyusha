const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist-user',
			aliases: ['blacklist'],
			group: 'default',
			memberName: 'blacklist-user',
			description: 'Bans the Mentioned User from Using the Bot',
			hidden: true,
			clientpermissions:['ADMINISTRATOR'],
			userPermissions:['BAN_MEMBERS'],
			throttling: {
				usages: 2,
				duration: 3
            },
			ownerOnly: true,

			args: [
				{
					key: 'user',
					prompt: 'whom do you want to blacklist?\n',
					type: 'user'
				},
				{
					key: 'option',
					prompt: ['Are You Sure You Want to Add ${user.tag} to the Blacklist?']
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		if (this.client.isOwner(user.id)) return msg.reply('the bot owner can not be blacklisted.');

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return msg.reply('that user is already blacklisted.');

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return msg.reply(`${user.tag} has been blacklisted from using ${this.client.user}.`);
	}
};
