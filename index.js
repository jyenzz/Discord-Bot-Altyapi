const Discord = require("discord.js");
const config = require("./ayarlar.json");
const bot = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
var versiyon = config.versiyon;
var yetkili = config.yetkili;
var aciklama = config.aciklama;
bot.commands = new Discord.Collection();

// Komut yükleyicisi +
fs.readdir("./komutlar", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./komutlar/${f}`);
    console.log(`${f} yüklendi.`);
    bot.commands.set(props.help.name, props);
  });
});
// Komut yükleyicisi -

// Konsol bilgilendirmesi / Oynuyor +
bot.on("ready", async () => {
  bot.user.setStatus("Online");
  bot.user.setActivity(aciklama + " || v" + versiyon, { type: "PLAYING" }); //aciklamayı ve versiyonu ayarlar.jsondan düzenle
  bot.user.setActivity("", { type: "PLAYING" });
  console.log("----------------------------");
  console.log(`• ${bot.user.username} çevrimiçi`);
  console.log("• Bot İstatistikleri ;")
  console.log("• Toplam Sunucu : "+ bot.guilds.size);
  console.log("• Toplam Kanal : "+ bot.channels.size);
  console.log("• Toplam Kullanıcı : "+ bot.users.size);
  console.log("----------------------------");
});
// Konsol bilgilendirmesi -

// Bot Çalıştığı zaman girceği sesli oda +
bot.on('ready', () => {
  let channel = bot.channels.get('Sesli Oda IDsi');
  channel.join()
});
// Bot Çalıştığı zaman girceği sesli oda -

// Prefix Ayarları +
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  if (
    message.content.toLowerCase().substring(0, prefix.length) != prefix &&
    message.content
  ) {
    return;
  }
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});
// Prefix Ayarları -

// Bot Çalıştırma +
bot.login(config.token);
// Bot Çalıştırma -

// Dm Destek + [ID GİRMEYİ UNUTMAYIN]
bot.on("message", async message => {
  if(message.author.id === bot.user.id) return;
  if(message.guild) return;
  bot.channels.get('Destek Mesajının Gönderiliceği Oda Idsi').send(new Discord.RichEmbed().setAuthor("Yeni Mesaj", bot.user.avatarURL).setFooter(message.author.tag, message.author.avatarURL).setDescription(`**Gönderen:** <@${message.author.id}>`).setTimestamp().addField("İletişim Metini", message.content).setColor("RANDOM"))
})
// Dm Destek -


// Glitch Host Başlatma + [Glitch kullanmıyacaksan burayı sil!]
const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
// Glitch Host Başlatma -
