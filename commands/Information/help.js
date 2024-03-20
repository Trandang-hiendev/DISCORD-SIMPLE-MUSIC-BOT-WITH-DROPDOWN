const {
    MessageEmbed,
    Message,
    MessageActionRow,
    MessageButton,
  MessageSelectMenu,
    Client
} = require("discord.js");
const { readdirSync } = require("fs");
const create_mh = require(`../../utils/menu.js`);

module.exports = {
    name: "help",
    category: "Info",
    aliases: [ "h" ],
    description: "To get information about all commands.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {

     let color = message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor;
      let categories = [];
        let cots = [];

        if (!args[0]) {

           let helpmenu = new MessageEmbed()
           .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://discord.gg/qksPNcgqhj")
         .setDescription(`My current prefix in this server is \`${prefix}\` Type \`${prefix}help <command name>\` to get information about a specific command.`)
         .addField(`**Links**`, `**[TEC](https://discord.gg/qksPNcgqhj) \n[Support Server](https://discord.gg/qksPNcgqhj)**`)
        .addField(`**Command Category**`, `✨ \`:\` **Filter**\n❗ \`:\` **Info**\n🔰 \`:\` **Utilities**\n🎧 \`:\` **Music**\n⚙️  \`:\` **Settings**\n\n\`Choose A Category To Get All Commands List\``)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setFooter(`© Total Commands: ${client.commands.filter((x) => x.category && x.category !== "Owner").map((x) => `\`${x.name}\``).length}`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder('❯ TEC Music Help Menu!')
                .addOptions([
                /*{
                    label: ' All Commands',
                    description: 'Get All Command List',
                    value: 'seventh',
                    emoji: '🗒️',
                },*/
                {
                    label: ' Filter',
                    description: 'Get All Filter Command List',
                    value: 'first',
                    emoji: '✨',
                },
                {
                    label: ' Info',
                    description: 'Get All Info Command List',
                    value: 'second',
                    emoji: '❗',
                },
                {
                    label: 'Utility',
                    description: 'Get All Utility Commmand List',
                    value: 'third',
                    emoji: '🔰',
                },
                {
                    label: 'Music',
                    description: 'Get All Music Command List',
                    value: 'fourth',
                    emoji: '🎧', 
                },
                {
                    label: 'Settings',
                    description: 'Get All Setting Command List',
                    value: 'sixth',
                    emoji:'⚙️',
                }
            ])
        )
        message.channel.send({ embeds: [helpmenu], components: [row] })
        } else {
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    if (client.commands.get(name).hidden) return;


                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (args[0].toLowerCase() !== "owner" && cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setAuthor(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!`, client.user.displayAvatarURL(), "https://discord.gg/qksPNcgqhj")
                    .setDescription(`My current prefix in this server is \`${prefix}\` Type \`${prefix}help <command name>\` to get information about a specific command.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.channel.send({
                    embeds: [combed]
                })
            };

            if (!command || command.category === "Owner") {
                const embed = new MessageEmbed()
                    .setDescription(`No command called "${args[0]}" found.`)
                    .setColor("#ff1010");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }
            const capitalized = command.name.charAt(0).toUpperCase() + command.name.slice(1);
            const embed = new MessageEmbed() 
              .setAuthor(`${capitalized} Command:`, client.user.displayAvatarURL(), "https://discord.gg/qksPNcgqhj")
              .setDescription(`**${command.description}**`)
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${prefix}${command.aliases.join(`\`, \`${prefix}`)}\``:
                    "No aliases for this command."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `${prefix}${command.name} ${command.usage}` :
                    `${prefix}${command.name}`
                )
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                .setColor(color);
            return await message.channel.send({
                embeds: [embed]
            });
        }
    },
};
