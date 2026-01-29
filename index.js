import "dotenv/config";
import { Events, Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 Conectado como ${c.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    const imagesPath = path.join(__dirname, "images");
    const imageFiles = fs
      .readdirSync(imagesPath)
      .map((f) => path.join(imagesPath, f));

    const resources = [
      ...imageFiles,
      "https://www.youtube.com/watch?v=AYHmGJLaYHk",
      "https://www.youtube.com/watch?v=BlBe8BmGjog",
      "https://www.nicovideo.jp/watch/sm30112635",
      "https://www.youtube.com/shorts/k4EpXqZSJzA"
    ];

    const choice = resources[Math.floor(Math.random() * resources.length)];

    // Si es enlace de YouTube
    if (choice.startsWith("http")) {
      await message.reply(choice);
    } else {
      // Si es archivo local
      await message.reply({ files: [choice] });
    }
  }
});

client.login(process.env.TOKEN);
