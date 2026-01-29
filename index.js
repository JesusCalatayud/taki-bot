import "dotenv/config";
import { Events, Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Necesario para __dirname en ES modules
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
    const images = fs.readdirSync(imagesPath);

    if (!images.length) {
      await message.reply("No tengo imágenes todavía 😢");
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    await message.reply({
      files: [path.join(imagesPath, randomImage)],
    });
  }
});

client.login(process.env.TOKEN);
