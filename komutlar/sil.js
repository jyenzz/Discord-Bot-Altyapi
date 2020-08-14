const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Rollerin arasında 'Mesajları Yönet' yok.");
  if(!args[0]) return message.channel.send(":question: Silinecek mesaj miktarını yazmadın? (_sil 10)");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`:recycle: ${args[0]} adet mesaj silindi.`).then(msg => msg.delete(3000));
});

}

module.exports.help = {
  name: 'sil',
  description: 'Sohbetteki mesajları temizler.',
  usage: 'sil 10'
}
