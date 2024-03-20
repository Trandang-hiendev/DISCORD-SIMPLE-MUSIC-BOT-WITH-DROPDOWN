const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Info",
    aliases: [ "addme", "links", "inv"],
    description: "Shows TEC's official invite links!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("TEC Music")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=1203646619522834452&permissions=281386773824&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://discord.gg/qksPNcgqhj")
			);

          const mainPage = new MessageEmbed()
            .setTitle("Invite Links For TEC!")
             .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
            .addField('TEC', `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=1203646619522834452&permissions=281386773824&scope=applications.commands%20bot)`, true)
            .addField('Support Server', `[Click Here](https://discord.gg/qksPNcgqhj)`)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}