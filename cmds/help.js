const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let cmds = [];
  let otherCommands = [];
  let utilityCommands = [];
  /* set command arrays */

  Object.keys(bot.commandDescriptions).forEach(cmd => {
    cmds.push(cmd);
  });
  /* push commands to command array */

  cmds.forEach(cmd => {
    if (bot.commandTypes[cmd] == "other") otherCommands.push(cmd);
    if (bot.commandTypes[cmd] == "utility") utilityCommands.push(cmd);
  });
  /* set category command arrays */

  cmds.sort();
  otherCommands.sort();
  utilityCommands.sort();
  /* sort command arrays */

  const helpEmbed = new Discord.RichEmbed()
    .setAuthor("Help", message.author.displayAvatarURL)
    .setFooter("Commands", bot.user.displayAvatarURL);
  /* create skeleton embed */

  let cmd = args[1];
  /* get command used */

  if (!cmd) {
    helpEmbed.setDescription(
      "Use `" +
        bot.prefix +
        " help <command>` to view help on a specific command.\nThese are **[**required**]** and **<**optional**>** fields."
    );
    helpEmbed.addField(
      "All Commands | " + cmds.length,
      "`" + cmds.join("`, `") + "`"
    );
    helpEmbed.addField(
      "Utility | " + utilityCommands.length,
      "`" + utilityCommands.join("`, `") + "`"
    );
    helpEmbed.addField(
      "Other | " + otherCommands.length,
      "`" + otherCommands.join("`, `") + "`"
    );
    message.channel.send(helpEmbed);
    /* set and send help embed */
    return;
  }

  if (cmd in bot.commandDescriptions) {
    let aliases = [];
    /* define aliases array */

    bot.commandAliases.forEach(a => {
      if (a.for == cmd) aliases = a.aliases;
    });
    /* set aliases (if any) */

    if (aliases.length >= 1) {
      aliases = "`" + aliases.join("`, `") + "`";
    } else {
      aliases = "none";
    }
    /* finalize aliases */

    helpEmbed.setFooter("The " + cmd + " Command");
    helpEmbed.setDescription(
      bot.commandDescriptions[cmd] +
        "\n\n**Usage:** " +
        bot.commandUsages[cmd] +
        "\n**Type:** " +
        bot.commandTypes[cmd] +
        "\n**Aliases:** " +
        aliases
    );
    message.channel.send(helpEmbed);
    /* set and send help embed */
    return;
  }
  if (!(cmd in bot.commandDescriptions))
    return message.channel.send("That command does not exist!");
  /* command not found message */
};
module.exports.help = {
  name: "help",
  description: "Shows you the commands in the bot.",
  usage: "help <command>",
  type: "other",
  commandAliases: ["commands", "cmds"]
};
