import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Telegraf, Stage, session } from 'telegraf';
import scenes from './scenes';

require('dotenv').config();

const stage = new Stage(scenes);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('auth'));
bot.help((ctx) => ctx.reply('Напиши /start'));

bot.startPolling();

// Запуск бота
bot.launch().then(() => {
  console.log('Bot is running 🚀');
});
