import "dotenv/config";
import { Events, Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Taki Sensei está vivo 🟢");
});

app.listen(PORT, () => {
  console.log(`Servidor web de ping escuchando en puerto ${PORT}`);
});

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
      "https://www.youtube.com/shorts/k4EpXqZSJzA",
      "https://www.youtube.com/watch?v=CkKCY_pCPi8&list=RDCkKCY_pCPi8&start_radio=1",
      "https://www.youtube.com/watch?v=Loc19ZmSbl4&list=RDLoc19ZmSbl4&start_radio=1",
      "https://www.youtube.com/watch?v=cHQJX8a8CWc&list=RDcHQJX8a8CWc&start_radio=1",
      "https://www.youtube.com/watch?v=-Fb9fpvpmcc&list=RDcHQJX8a8CWc&index=2",
      "https://www.youtube.com/watch?v=1idEz14NokY&list=RD1idEz14NokY&start_radio=1",
      "https://www.youtube.com/shorts/vC7r5anbZfo",
      "https://www.youtube.com/watch?v=VbUIPHFbQzA",
      "https://www.youtube.com/shorts/xYK0RgqcrBs",
    ];

    if (message.content.includes("67")) {
      const videoPath = path.join(__dirname, "images", "sixseven.mp4");
      await message.reply({ files: [videoPath] });
      return;
    }

     if (message.content.includes("festuk")) {
      await message.reply("https://www.youtube.com/watch?v=vOuIrIE2c8I&list=RDvOuIrIE2c8I&start_radio=1");
      return;
    }

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

client
  .login(process.env.TOKEN)
  .then(() => console.log("Bot intentando conectarse..."))
  .catch((err) => console.error("Error al conectar el bot:", err));
